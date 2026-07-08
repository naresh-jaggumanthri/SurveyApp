import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTranslation } from 'react-i18next';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UserProfileCard = (props) => {
  const { loginData } = props;
  const { t } = useTranslation();
  
  // State to manage expand / collapse
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    // Configures the next frame of the layout to animate smoothly
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  // Helper row component
  const InfoRow = ({ label, value }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{t(label)}:</Text>
      <Text style={styles.value} numberOfLines={2}>
        {value || 'N/A'}
      </Text>
    </View>
  );

  return (
    <View style={styles.card}>
      {/* Wrapped header in TouchableOpacity to make it the toggle trigger */}
      <TouchableOpacity 
        style={styles.header} 
        onPress={toggleAccordion} 
        activeOpacity={0.7}
      >
        <Text style={styles.headerTitle}>{t("User Information")}</Text>
        {/* Visual indicator for state (Chevron/Arrow replacement) */}
        <Text style={styles.icon}>{isExpanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {/* Conditional rendering handles the "seek and hide" */}
      {isExpanded && (
        <View style={styles.content}>
          <InfoRow label="Name" value={loginData?.username} />
          <InfoRow label="District" value={loginData?.district} />
          <InfoRow label="Block" value={loginData?.block} />
          <InfoRow label="Gram Panchayat" value={loginData?.gp} />
          
          <View style={styles.villageContainer}>
            <Text style={styles.label}>{t("Village")}:</Text>
            <Text style={styles.villageText}>
              {loginData?.village ? loginData.village.join(', ') : 'N/A'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingBottom: 4, // Reduced from 16 to keep collapsed state tight
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden', // Keeps child content inside boundaries during animation
  },
  header: {
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  icon: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#222',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  villageContainer: {
    marginTop: 12,
  },
  villageText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default UserProfileCard;