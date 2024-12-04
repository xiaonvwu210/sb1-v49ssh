import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const Background = styled.div`
  background-color: #f5e6d3;
  background-image: url('/bg-pattern.png');
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #8b4513;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  font-family: "Ma Shan Zheng", cursive;
`;

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <Background>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <Title>中药连连看</Title>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-8 py-4 bg-red-800 text-white rounded-lg text-xl shadow-lg
                     hover:bg-red-700 transition-colors duration-200"
        >
          开始游戏
        </motion.button>
      </motion.div>
    </Background>
  );
};