import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import React, { useState } from 'react';
import Users from '../tabs/Users';
import Setting from '../tabs/Setting';

const MainScreen = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const scaleAnim = new Animated.Value(1);

    const handlePress = (tabIndex) => {
        setSelectedTab(tabIndex);

        // Animation effect
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            {selectedTab === 0 ? <Users /> : <Setting />}

            {/* Bottom Tab Bar */}
            <View style={styles.bottomTab}>
                <TouchableOpacity style={styles.tab} onPress={() => handlePress(0)}>
                    <Animated.View style={[styles.iconContainer, selectedTab === 0 && styles.activeIcon]}>
                        <Image
                            source={require('../images/user.png')}
                            style={[styles.tabIcon, { tintColor: selectedTab === 0 ? 'white' : 'gray' }]}
                        />
                    </Animated.View>
                    <Text style={[styles.tabText, { color: selectedTab === 0 ? 'white' : 'gray' }]}>Users</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.tab} onPress={() => handlePress(1)}>
                    <Animated.View style={[styles.iconContainer, selectedTab === 1 && styles.activeIcon]}>
                        <Image
                            source={require('../images/settings.png')}
                            style={[styles.tabIcon, { tintColor: selectedTab === 1 ? 'white' : 'gray' }]}
                        />
                    </Animated.View>
                    <Text style={[styles.tabText, { color: selectedTab === 1 ? 'white' : 'gray' }]}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bottomTab: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: 80,
        backgroundColor: 'purple',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10, // Adds shadow on Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    activeIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle highlight
    },
    tabIcon: {
        width: 30,
        height: 30,
    },
    tabText: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 5,
    },
});
