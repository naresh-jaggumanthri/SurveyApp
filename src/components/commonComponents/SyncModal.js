import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const SyncModal = ({ visible, onClose, stats, onStartSync, isSyncing, progress }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Data Sync Status</Text>
                    
                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Pending</Text>
                            <Text style={[styles.statValue, {color: '#d9534f'}]}>{stats.pending}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Synced</Text>
                            <Text style={[styles.statValue, {color: '#5cb85c'}]}>{stats.synced}</Text>
                        </View>
                    </View>

                    {isSyncing ? (
                        <View style={styles.progressSection}>
                            <ActivityIndicator size="large" color="#0275d8" />
                            <Text style={styles.progressText}>
                                Syncing {progress.current} of {progress.total}...
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity 
                                style={[styles.btn, styles.syncBtn]} 
                                onPress={onStartSync}
                                disabled={stats.pending === 0}
                            >
                                <Text style={styles.btnText}>Start Sync Now</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={[styles.btn, styles.closeBtn]} onPress={onClose}>
                                <Text style={styles.btnText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

// Styles for the Modal
const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '85%', backgroundColor: 'white', borderRadius: 15, padding: 20, alignItems: 'center' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 25 },
    statBox: { alignItems: 'center' },
    statLabel: { fontSize: 14, color: '#666' },
    statValue: { fontSize: 24, fontWeight: 'bold' },
    progressSection: { alignItems: 'center', marginVertical: 20 },
    progressText: { marginTop: 10, fontSize: 16, color: '#333' },
    buttonGroup: { width: '100%' },
    btn: { padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    syncBtn: { backgroundColor: '#0275d8' },
    closeBtn: { backgroundColor: '#ccc' },
    btnText: { color: 'white', fontWeight: 'bold' }
});

export default SyncModal;