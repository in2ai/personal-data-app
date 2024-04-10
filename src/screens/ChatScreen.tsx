import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../navigation/MainNav';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { WorkOffer } from '../models/WorkOffer';
import { useAuthContext } from '../context-providers/auth-context';
import { EventTemplate, relayInit } from 'nostr-tools';
import { publishEventToRelay, signEvent } from '../api/.unused/nostr';
const RELAY_URL = 'ws://137.184.117.201:8008';

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

class ChatMessage {
    fromPublicKey: string;
    timestamp: number;
    content: string;
};

const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
    const { publicKey, secretKey } = useAuthContext();
    const { workOffer }: { workOffer: WorkOffer } = route.params;
    const authors = [publicKey, workOffer.authorPublicKey];
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');

    const subscribeToChat = async () => {
        const relay = relayInit(RELAY_URL);
        relay.on('connect', () => {
            console.log('Connected to relay');
            const sub = relay.sub([{
                kinds: [1],
                authors: authors.filter((author) => author !== undefined),
                '#t': [workOffer.nostrId],
            }]);
            console.log('Author:', authors.filter((author) => author !== undefined));
            console.log('NostrId:', workOffer.nostrId);
            sub.on('event', async (event) => {
                setChatMessages((prev) => [...prev, {
                    fromPublicKey: event.pubkey,
                    timestamp: event.created_at,
                    content: event.content
                }]);
            });
        });
        relay.connect();
    };
    useEffect(() => {
        subscribeToChat();
    }, []);

    const sendMessage = async () => {    
        const eventTemplate: EventTemplate = {
            kind: 1,
            tags: [['t', workOffer.nostrId]],
            content: message,
            created_at: Math.floor(Date.now() / 1000),
        };
        const signedEvent = signEvent(eventTemplate, secretKey);
        await publishEventToRelay(RELAY_URL, signedEvent);
        setMessage('');
    };

    return <View className="bg-white p-4 pt-2">
        <View className="mb-4">
            <Text className="text-lg">Chat with {workOffer.authorPublicKey}</Text>
        </View>
        <Text className="text-lg">Messages</Text>
        <View className="mb-4 max-h-[300px] bg-slate-200">
            <ScrollView ref={(ref) => ref?.scrollToEnd({ animated: false })}>
            {chatMessages.map((message, index) => <View key={index} className="m-2">
                {
                    publicKey === message.fromPublicKey ?
                        <Text className="text-sm text-right">{message.content}</Text> :
                        <Text className="text-sm text-left">{message.content}</Text>
                }
            </View>)}
            </ScrollView>
        </View>
        <View className="flex flex-row">
            <TextInput
                className="flex-1 border border-slate-400 rounded-lg p-2"
                value={message}
                onChangeText={setMessage}
            />
            <View className="p-2">
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>

    </View>;
}

export default ChatScreen;