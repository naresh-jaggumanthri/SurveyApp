import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next'; // Assuming you use i18next

const UserProfileCard = (props) => {
    const {loginData}=props;
  const { t } = useTranslation();

  // Helper to format labels
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("User Information")}</Text>
      </View>

      <View style={styles.content}>
        <InfoRow label={t("Name")} value={loginData?.username} />
        <InfoRow label={t("District")} value={loginData?.district} />
        <InfoRow label={t("Block")} value={loginData?.block} />
        <InfoRow label={t("Gram Panchayat")} value={loginData?.gp} />
        
        <View style={styles.villageContainer}>
          <Text style={styles.label}>{t("Village")}:</Text>
          <Text style={styles.villageText}>
            {loginData?.village ? loginData.village.join(', ') : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingBottom: 16,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
  },
  header: {
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
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