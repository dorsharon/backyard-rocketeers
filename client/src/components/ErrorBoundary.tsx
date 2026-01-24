import { Box, Button, Card, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconAlertTriangle, IconRefresh, IconRocket } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated background stars */}
          <Box
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            {Array.from({ length: 30 }, (_, i) => (
              <Box
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: Math.random() * 2 + 1,
                  height: Math.random() * 2 + 1,
                  background: 'white',
                  borderRadius: '50%',
                  opacity: 0.5,
                  animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 1, maxWidth: 500, width: '100%' }}
          >
            <Card
              padding="xl"
              radius="xl"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 100, 100, 0.3)',
              }}
            >
              <Stack gap="xl" align="center">
                {/* Animated crash icon */}
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: 'reverse',
                  }}
                >
                  <ThemeIcon
                    size={100}
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'red', to: 'orange', deg: 135 }}
                    style={{
                      boxShadow: '0 0 40px rgba(255, 100, 100, 0.4)',
                    }}
                  >
                    <IconAlertTriangle size={50} stroke={1.5} />
                  </ThemeIcon>
                </motion.div>

                {/* Error title */}
                <Box ta="center">
                  <Title
                    order={2}
                    mb="xs"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa06b 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Houston, We Have a Problem!
                  </Title>
                  <Text c="dimmed" size="sm">
                    The rocket experienced an unexpected malfunction
                  </Text>
                </Box>

                {/* Error details */}
                <Card
                  padding="md"
                  radius="md"
                  style={{
                    background: 'rgba(255, 100, 100, 0.1)',
                    border: '1px solid rgba(255, 100, 100, 0.2)',
                    width: '100%',
                  }}
                >
                  <Stack gap="xs">
                    <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                      Error Details
                    </Text>
                    <Text
                      size="sm"
                      c="red.4"
                      ff="monospace"
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {this.state.error?.message || 'Unknown error'}
                    </Text>
                    {this.state.error?.stack && (
                      <Box
                        style={{
                          maxHeight: 150,
                          overflow: 'auto',
                          background: 'rgba(0, 0, 0, 0.3)',
                          borderRadius: 8,
                          padding: 10,
                        }}
                      >
                        <Text
                          size="xs"
                          c="dimmed"
                          ff="monospace"
                          style={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all',
                          }}
                        >
                          {this.state.error.stack.split('\n').slice(1, 6).join('\n')}
                        </Text>
                      </Box>
                    )}
                  </Stack>
                </Card>

                {/* Retry button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ width: '100%' }}
                >
                  <Button
                    fullWidth
                    size="lg"
                    radius="md"
                    variant="gradient"
                    gradient={{ from: 'violet', to: 'pink', deg: 135 }}
                    leftSection={<IconRefresh size={20} />}
                    onClick={this.handleRetry}
                    style={{
                      boxShadow: '0 4px 20px rgba(121, 80, 242, 0.4)',
                    }}
                  >
                    Restart Mission
                  </Button>
                </motion.div>

                {/* Footer */}
                <Box ta="center">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: 'reverse',
                    }}
                  >
                    <IconRocket
                      size={20}
                      style={{ color: 'rgba(255, 255, 255, 0.3)', transform: 'rotate(45deg)' }}
                    />
                  </motion.div>
                  <Text size="xs" c="dimmed" mt="xs">
                    If this keeps happening, try clearing your browser cache
                  </Text>
                </Box>
              </Stack>
            </Card>
          </motion.div>
        </Box>
      );
    }

    return this.props.children;
  }
}
