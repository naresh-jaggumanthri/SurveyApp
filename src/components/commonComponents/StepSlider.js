import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  PanResponder, 
  GestureResponderEvent, 
  PanResponderGestureState, 
  Animated,
  TextInput 
} from 'react-native';

interface StepSliderProps {
  minValue?: number;
  maxValue?: number;
  step?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
}

export default function StepSlider({
  minValue = 0,
  maxValue = 1000, // Bumped defaults up to make testing 100s easier
  step = 100,      // Defaulted to 100 to showcase the hint
  initialValue = 500,
  onValueChange,
}: StepSliderProps) {
  const [value, setValue] = useState(initialValue);
  // String state to handle the text input cleanly without breaking while editing
  const [inputValue, setInputValue] = useState(initialValue.toString());
  
  // Track the actual layout width of the slider track to accurately calculate percentages
  const [trackWidth, setTrackWidth] = useState(0);

  // Keep text input string in sync when the numerical state shifts via buttons or dragging
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  // Central function to update values within logical boundaries
  const updateValue = (newValue: number) => {
    const roundedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.max(minValue, Math.min(maxValue, roundedValue));
    setValue(clampedValue);
    if (onValueChange) onValueChange(clampedValue);
  };

  // Handles raw user typed text entry
  const handleTextChange = (text: string) => {
    setInputValue(text);
    
    // Parse it immediately if it's a valid number so the slider glides dynamically while typing
    const parsed = parseFloat(text);
    if (!isNaN(parsed)) {
      const clampedValue = Math.max(minValue, Math.min(maxValue, parsed));
      setValue(clampedValue);
      if (onValueChange) onValueChange(clampedValue);
    }
  };

  // Cleans and snaps the value to the nearest logical "step" when user finishes editing text
  const handleTextBlur = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed)) {
      updateValue(value);
    } else {
      updateValue(parsed);
    }
  };

  // Maps physical pixel coordinate changes directly to values between min and max
  const handlePan = (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    if (trackWidth === 0) return;

    // Get touch position relative to the track bounds
    const locationX = evt.nativeEvent.locationX;
    const percentage = Math.max(0, Math.min(1, locationX / trackWidth));
    const calculatedValue = minValue + percentage * (maxValue - minValue);
    
    updateValue(calculatedValue);
  };

  // Native touch gesture controller setup
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: handlePan,
      onPanResponderMove: handlePan,
    })
  ).current;

  // Percentage value for drawing the visual filled state
  const fillPercentage = ((value - minValue) / (maxValue - minValue)) * 100;

  return (
    <View style={styles.container}>
      {/* Input Header Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.valueInput}
          value={inputValue}
          onChangeText={handleTextChange}
          onBlur={handleTextBlur}
          keyboardType="numeric"
          returnKeyType="done"
          maxLength={6}
          selectTextOnFocus={true}
        />
        {/* Dynamic Multiple Helper Label */}
        <Text style={styles.helperText}>Enter in multiples of {step}</Text>
      </View>

      <View style={styles.controlsRow}>
        {/* Decrement Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => updateValue(value - step)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        {/* Draggable Track System */}
        <Animated.View 
          style={styles.trackContainer}
          onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
          {...panResponder.panHandlers}
        >
          <View style={styles.trackBackground}>
            <View style={[styles.trackFill, { width: `${fillPercentage}%` }]} />
          </View>
          {/* Custom Slider Thumb Knob */}
          <View style={[styles.thumbKnob, { left: `${fillPercentage}%` }]} />
        </Animated.View>

        {/* Increment Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => updateValue(value + step)}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    margin: 10 
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  valueInput: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#1C1C1E',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    minWidth: 100,
  },
  helperText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#8E8E93',
    marginTop: 6,
  },
  controlsRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%' 
  },
  trackContainer: { 
    flex: 1, 
    marginHorizontal: 15, 
    height: 40, 
    justifyContent: 'center',
    position: 'relative',
  },
  trackBackground: { 
    height: 6, 
    backgroundColor: '#D1D1D6', 
    borderRadius: 3, 
    width: '100%', 
    overflow: 'hidden' 
  },
  trackFill: { 
    height: '100%', 
    backgroundColor: '#007AFF' 
  },
  thumbKnob: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    marginLeft: -12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
  button: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    backgroundColor: '#F2F2F7', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  buttonText: { 
    fontSize: 22, 
    fontWeight: '600', 
    color: '#007AFF' 
  },
});