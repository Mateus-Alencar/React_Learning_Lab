import React from 'react';
// Dimensions -> Pega o tamanho da tela
import { View, Dimensions } from 'react-native';
// useSharedValue: cria valores animáveis
// useAnimatedStyle: conecta valores animados ao estilo
// withSpring: cria animação com efeito de mola
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// PanGestureHandler: detecta movimento de toque
import { PanGestureHandler } from 'react-native-gesture-handler';

export default function FollowFinger() {
  // x e y são as posições do quadrado
  const x = useSharedValue(Dimensions.get('window').width / 2 - 50);
  const y = useSharedValue(Dimensions.get('window').height / 2 - 50);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    // pega a posição do toque (event.nativeEvent.x e y) atualiza x e y
    <PanGestureHandler onGestureEvent={(event) => {
      x.value = withSpring(event.nativeEvent.x - 50);
      y.value = withSpring(event.nativeEvent.y - 50);
    }}>
      <View style={{ flex: 1 }}>
        <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'orange', borderRadius: 10, position: 'absolute' }, animatedStyle]} />
      </View>
    </PanGestureHandler>
  );
}





