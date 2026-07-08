import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const InternetStatusModal = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      // state.isConnected can be null initially, handle it safely
      setIsConnected(state.isConnected !== false);
    });

    return () => {
      // Clean up the subscription on unmount
      unsubscribe();
    };
  }, []);

  // The modal only triggers when isConnected is explicitly false
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={!isConnected}
      onRequestClose={() => {}} // Prevents Android back button from closing it
    >
      <View style={styles.modalBackground}>
        <View style={styles.alertContainer}>
          <ActivityIndicator size="large" color="#FF3B30" style={styles.spinner} />
          <Text style={styles.title}>Connection Lost</Text>
          <Text style={styles.subtitle}>
            Please check your internet settings. We'll reconnect as soon as you're back online.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)', // Semi-transparent dimming effect
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  spinner: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default InternetStatusModal;