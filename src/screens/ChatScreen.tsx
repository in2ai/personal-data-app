import 'expo-dev-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../navigation/MainNav';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { WorkOffer } from '../models/WorkOffer';
import { useAuthContext } from '../context-providers/auth-context';
import { EventTemplate, relayInit } from 'nostr-tools';
import { publishEventToRelay, signEvent } from '../api/.unused/nostr';
import CustomPressableOpacity from '../components/layout/CustomPressableOpacity';

import SendFill from '../assets/img/svg/send-fill.svg';
import { environment } from '../environments/environment';

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

class ChatMessage {
  id: string;
  fromPublicKey: string;
  timestamp: number;
  content: string;
}

const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
  const { publicKey, secretKey } = useAuthContext();
  const { workOffer }: { workOffer: WorkOffer } = route.params;
  const authors = [publicKey, workOffer.authorPublicKey];
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState('');

  const subscribeToChat = async () => {
    const relay = relayInit(environment.RELAY_URL);
    relay.on('connect', () => {
      console.log('Connected to relay');
      const sub = relay.sub([
        {
          kinds: [1],
          authors: authors.filter((author) => author !== undefined),
          '#t': [workOffer.nostrId],
        },
      ]);
      console.log(
        'Author:',
        authors.filter((author) => author !== undefined)
      );
      console.log('NostrId:', workOffer.nostrId);
      sub.on('event', async (event) => {
        if (chatMessages.find((msg) => msg.id === event.id) !== undefined) return;

        setChatMessages((prev) => [
          ...prev,
          {
            id: event.id,
            fromPublicKey: event.pubkey,
            timestamp: event.created_at,
            content: event.content,
          },
        ]);
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
    await publishEventToRelay(environment.RELAY_URL, signedEvent);
    setMessage('');
  };

  return (
    <View className="flex h-full justify-start">
      <View className="flex-none bg-[#9dbec5] p-3">
        <Text className="text-sm text-[#527177]">Chat with: "{workOffer.authorPublicKey}"</Text>
      </View>
      {/* chat */}
      <View className="flex-1 bg-[#d5eef4]">
        <ScrollView
          className="px-3"
          ref={(ref) => ref?.scrollToEnd({ animated: false })}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="pt-3">
            {chatMessages.map((message, index) => (
              <View key={index} className="pb-3">
                {publicKey === message.fromPublicKey ? (
                  <View className="flex w-full items-end">
                    <View className="flex-row">
                      <View className="rounded-bl-md rounded-br-md rounded-tl-md bg-brandColor px-3 py-2">
                        <Text className=" text-base text-white">{message.content}</Text>
                      </View>
                      <View className="h-0 w-0 border-r-[5px] border-t-[11px] border-r-transparent border-t-brandColor"></View>
                    </View>
                  </View>
                ) : (
                  <View className="flex w-full items-start">
                    <View className="flex-row">
                      <View className="h-0 w-0 border-l-[5px] border-t-[11px] border-l-transparent border-t-[#86cadb]"></View>
                      <View className="rounded-bl-md rounded-br-md rounded-tr-md bg-[#86cadb] px-3 py-2">
                        <Text className=" text-base text-brandColor">{message.content}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      {/* send action */}
      <View className="flex flex-none flex-row bg-white p-3">
        <TextInput
          className="mr-2 h-14 flex-1 rounded-md border border-slate-400 px-3"
          value={message}
          onChangeText={setMessage}
        />
        <CustomPressableOpacity onPress={sendMessage}>
          <View className="flex h-14 w-14 items-center justify-center rounded-md bg-brandColor">
            <SendFill width={24} height={24} fill={'#ffffff'} />
          </View>
        </CustomPressableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
