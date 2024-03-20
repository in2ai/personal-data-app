import React, { createContext, useContext, useMemo, useReducer } from 'react';
import CustomPressableOpacity from '../layout/CustomPressableOpacity';

// Icons
import ArrowRightCircleFill from '../../assets/img/svg/arrow-right-circle-fill.svg';
import ArrowLeftCircleFill from '../../assets/img/svg/arrow-left-circle-fill.svg';
import { Text, View } from 'react-native';

const StepContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload.stepNumber,
      };
    case 'SET_NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case 'SET_PREV_STEP':
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    default:
      return state;
  }
};

const StepScreen = ({ currentStep, steps }) => {
  const StepComponent = steps.find((step) => step.screen === currentStep)?.component || null;
  return StepComponent;
};

const StepNavigator = ({ stepComponents, initialStep }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentStep: initialStep,
  });
  const stepActions = useMemo(
    () => ({
      goToStep: async (stepNumber) => {
        dispatch({ type: 'SET_STEP', payload: { stepNumber: stepNumber } });
      },
      goToNextStep: async () => {
        dispatch({ type: 'SET_NEXT_STEP' });
      },
      goToPrevStep: async () => {
        dispatch({ type: 'SET_PREV_STEP' });
      },
    }),
    []
  );
  return (
    <StepContext.Provider value={{ ...stepActions, currentStep: state.currentStep }}>
      <View className="flex h-2 grow overflow-hidden">
        <StepScreen currentStep={state.currentStep} steps={stepComponents} />
      </View>
      {/* Nav */}
      <View className="w-full flex-none flex-row items-center justify-between border-t border-dotted border-[#3c7c8c] pt-3">
        <CustomPressableOpacity
          accessibilityLabel={'previousStep'}
          onPress={stepActions.goToPrevStep}
          disabled={state.currentStep === 1}
        >
          <ArrowLeftCircleFill width={25} height={25} fill={'#3c7c8c'} />
        </CustomPressableOpacity>
        <View className="flex items-center p-3">
          <Text>
            {state.currentStep} / {stepComponents.length}
          </Text>
        </View>
        <CustomPressableOpacity
          accessibilityLabel={'nextStep'}
          onPress={stepActions.goToNextStep}
          disabled={state.currentStep === stepComponents.length}
        >
          <ArrowRightCircleFill width={25} height={25} fill={'#3c7c8c'} />
        </CustomPressableOpacity>
      </View>
    </StepContext.Provider>
  );
};

export const useStepContext = () => {
  const context = useContext(StepContext);
  if (!Object.keys(context).length) {
    throw new Error(
      'StepContext provider is not found. Make sure that you are using StepNavigator to handle this screen.'
    );
  }
  return context;
};

export default StepNavigator;
