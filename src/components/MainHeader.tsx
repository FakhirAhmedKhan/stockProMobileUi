import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';

// Mock icon components (replace with react-native-vector-icons in real app)
const TrendingUpIcon = () => <Text style={styles.iconLarge}>📈</Text>;
const SparklesIcon = () => <Text style={styles.iconSmall}>✨</Text>;
const PlusIcon = () => <Text style={styles.iconMedium}>➕</Text>;

interface HeaderProps {
  BtnText?: string;
  setIsModalOpen?: (isOpen: boolean) => void;
  setChartData?: (data: any) => void;
  setData?: (data: any) => void;
  isVisible?: boolean;
  H1Heading: string;
  Paragraph: string;
  Updates?: string;
  StutsUpdates?: string;
  showButton?: boolean;
  showRangePicker?: boolean;
  Icon?: React.ReactNode;
  fullName?: string;
}

export const MainHeader: React.FC<HeaderProps> = ({
  BtnText = 'Add New',
  setIsModalOpen,
  setChartData,
  setData,
  isVisible = true,
  H1Heading,
  Paragraph,
  Updates = 'Recent Updates',
  StutsUpdates = 'Active',
  showButton = true,
  showRangePicker = true,
  Icon,
  fullName = 'User',
}) => {
  const [time, setTime] = useState(new Date());
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(20))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      {/* Animated background elements */}
      <View style={styles.backgroundContainer}>
        <Animated.View
          style={[
            styles.backgroundBlob1,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.backgroundBlob2,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Top section */}
          <View style={styles.topSection}>
            {/* Left: Title & Description */}
            <View style={styles.leftSection}>
              <View style={styles.titleRow}>
                {/* Icon Container */}
                <View style={styles.iconContainer}>
                  <View style={styles.iconGlow} />
                  <View style={styles.iconBox}>
                    {Icon || <TrendingUpIcon />}
                  </View>
                </View>

                {/* Title and Description */}
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>{H1Heading}</Text>
                  <Text style={styles.paragraph}>{Paragraph}</Text>
                  <Text style={styles.userName}>{fullName}</Text>
                </View>
              </View>

              {/* Stats badges */}
              <View style={styles.badgesContainer}>
                <View style={styles.badgeGreen}>
                  <View style={styles.statusIndicator}>
                    <View style={styles.pulseOuter} />
                    <View style={styles.pulseInner} />
                  </View>
                  <Text style={styles.badgeTextGreen}>{StutsUpdates}</Text>
                </View>

                <View style={styles.badgeYellow}>
                  <SparklesIcon />
                  <Text style={styles.badgeTextYellow}>{Updates}</Text>
                </View>
              </View>
            </View>

            {/* Right: Controls */}
            <View style={styles.rightSection}>
              {/* Range Picker Placeholder */}
              {showRangePicker && (
                <View style={styles.rangePickerContainer}>
                  <Text style={styles.rangePickerText}>📅 Date Range</Text>
                  {/* Add your RangePicker component here */}
                </View>
              )}

              {/* Time display */}
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime()}</Text>
              </View>
            </View>
          </View>

          {/* Action button */}
          {showButton && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setIsModalOpen?.(true)}
                activeOpacity={0.85}
              >
                <View style={styles.buttonGlow} />
                <View style={styles.buttonContent}>
                  <View style={styles.plusIconContainer}>
                    <PlusIcon />
                  </View>
                  <Text style={styles.buttonText}>{BtnText}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Gradient border */}
      <View style={styles.gradientBorder} />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f7ff',
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  backgroundBlob1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    backgroundColor: '#e9d5ff',
    borderRadius: 150,
    opacity: 0.3,
  },
  backgroundBlob2: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    width: 300,
    height: 300,
    backgroundColor: '#fae8ff',
    borderRadius: 150,
    opacity: 0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  contentContainer: {
    flex: 1,
  },
  topSection: {
    marginBottom: 24,
  },
  leftSection: {
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  iconGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: '#8b5cf6',
    borderRadius: 30,
    opacity: 0.3,
  },
  iconBox: {
    backgroundColor: '#8b5cf6',
    padding: 16,
    borderRadius: 24,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  textContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    color: '#7c3aed',
    marginBottom: 8,
    lineHeight: 38,
  },
  paragraph: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#6ee7b7',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusIndicator: {
    position: 'relative',
    width: 10,
    height: 10,
    marginRight: 10,
  },
  pulseOuter: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#10b981',
    borderRadius: 5,
    opacity: 0.6,
  },
  pulseInner: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#10b981',
    borderRadius: 5,
  },
  badgeTextGreen: {
    fontSize: 13,
    fontWeight: '600',
    color: '#065f46',
  },
  badgeYellow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fcd34d',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeTextYellow: {
    fontSize: 13,
    fontWeight: '600',
    color: '#92400e',
    marginLeft: 8,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 12,
  },
  rangePickerContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 200,
  },
  rangePickerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  timeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    letterSpacing: 0.5,
  },
  buttonContainer: {
    alignItems: 'flex-start',
    marginTop: 8,
  },
  actionButton: {
    position: 'relative',
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    opacity: 0.2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  plusIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 4,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  gradientBorder: {
    height: 3,
    backgroundColor: '#c084fc',
    opacity: 0.6,
  },
  iconLarge: {
    fontSize: 28,
    color: '#ffffff',
  },
  iconSmall: {
    fontSize: 16,
  },
  iconMedium: {
    fontSize: 18,
    color: '#ffffff',
  },
});