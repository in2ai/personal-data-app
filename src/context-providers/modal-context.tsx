import React, { useEffect } from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Animated, View, Text, Modal, Pressable } from 'react-native';
import CustomButton from '../components/smart/CustomButton';
import X from '../assets/img/svg/x.svg';

interface ModalContextInterface {
  setModal: (title: string, message: string) => void;
  setConfirmCancelModal: (title: string, message: string) => Promise<boolean>;
  setOnlyConfirmModal: (title: string, message: string) => Promise<boolean>;
  unsetModal: () => void;
}

export const ModalContext = createContext<ModalContextInterface>({} as ModalContextInterface);

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [confirm, setConfirm] = useState<(value: any) => void>();
  const [reject, setReject] = useState<(value: any) => void>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [isConfirmBtVisible, setIsConfirmBtVisible] = useState<boolean>(false);
  const [isCancelBtVisible, setIsCancelBtVisible] = useState<boolean>(false);
  const [isCloseBtVisible, setIsCloseBtVisible] = useState<boolean>(false);

  const setModal = (modalTitle: string, modalMessage: string) => {
    setIsConfirmBtVisible(true);
    setIsCancelBtVisible(false);
    setIsCloseBtVisible(true);
    setTitle(modalTitle);
    setMessage(modalMessage);
    setIsModalVisible(true);
  };

  const setConfirmCancelModal = (modalTitle: string, modalMessage: string): Promise<boolean> => {
    setIsConfirmBtVisible(true);
    setIsCancelBtVisible(true);
    setIsCloseBtVisible(true);
    setTitle(modalTitle);
    setMessage(modalMessage);
    setIsModalVisible(true);
    return new Promise<boolean>((resolve, promiseReject) => {
      setConfirm(() => resolve);
      setReject(() => promiseReject);
    });
  };

  const setOnlyConfirmModal = (modalTitle: string, modalMessage: string): Promise<boolean> => {
    setIsConfirmBtVisible(true);
    setIsCancelBtVisible(false);
    setIsCloseBtVisible(false);
    setTitle(modalTitle);
    setMessage(modalMessage);
    setIsModalVisible(true);
    return new Promise<boolean>((resolve, promiseReject) => {
      setConfirm(() => resolve);
      setReject(() => promiseReject);
    });
  };

  const unsetModal = () => {
    setTitle(undefined);
    setMessage(undefined);
    setIsModalVisible(false);
  };

  const api = {
    setModal,
    setConfirmCancelModal,
    setOnlyConfirmModal,
    unsetModal,
  };

  const onConfirm = () => {
    confirm && confirm(true);
    setConfirm(undefined);
    unsetModal();
  };

  const onCancel = () => {
    console.log('onCancel');
    reject && reject(false);
    setReject(undefined);
    unsetModal();
  };

  const onClose = () => {
    setConfirm(undefined);
    setReject(undefined);
    unsetModal();
  };

  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isModalVisible ? 0.5 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isModalVisible, fadeAnim]);

  return (
    <ModalContext.Provider value={api}>
      <View className="relative h-full w-full">
        {children}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setIsModalVisible(false);
          }}
        >
          <View
            className="h-full w-full items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <View
              className="relative w-full max-w-[60%] rounded-md bg-white p-3 drop-shadow-lg"
              style={{
                shadowColor: '#000000',
                elevation: 5,
              }}
            >
              {/* Header */}
              <View className="w-full flex-row items-center justify-between border-b border-[#D2DAE1] pb-3">
                <Text className="text-brandRed pl-1 text-lg font-bold">{title}</Text>
                {isCloseBtVisible && (
                  <Pressable className="" onPress={onClose}>
                    <X width={30} height={30} fill={'#9EA5B0'} />
                  </Pressable>
                )}
              </View>
              {/* Content */}
              <View className="mb-3 py-5">
                <Text className="text-center text-base">{message}</Text>
              </View>
              {/* Actions */}
              <View
                className={`flex-none flex-row items-end ${
                  isCancelBtVisible && isConfirmBtVisible ? 'justify-between' : 'justify-end'
                }`}
              >
                {isCancelBtVisible === true && (
                  <View className="w-1/2 pr-2">
                    <CustomButton buttonType="secondary" title="Cancelar" onPress={onCancel} />
                  </View>
                )}
                {isConfirmBtVisible === true && (
                  <View className="w-1/2 pl-2">
                    <CustomButton buttonType="primary" title="Aceptar" onPress={onConfirm} />
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalContextProvider;
