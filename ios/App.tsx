import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const goToPage = (pageName: string) => {
    setCurrentPage(pageName);
  };

  const goHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* 標題區域 */}
          <View style={styles.header}>
            <Text style={styles.mainTitle}>《金剛般若波羅蜜經》</Text>
            <Text style={styles.subTitle}>鳩摩羅什法師譯</Text>
          </View>

          {/* 按鈕區域 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#8B4513' }]}
              onPress={() => goToPage('pageReader')}
            >
              <Text style={styles.buttonText}>金剛經（翻頁版）</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#A0522D' }]}
              onPress={() => goToPage('longPageReader')}
            >
              <Text style={styles.buttonText}>金剛經（滾字版）</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#CD853F' }]}
              onPress={() => goToPage('dedication')}
            >
              <Text style={styles.buttonText}>迥向文</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#D2691E' }]}
              onPress={() => goToPage('settings')}
            >
              <Text style={styles.buttonText}>設定</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#B8860B' }]}
              onPress={() => goToPage('share')}
            >
              <Text style={styles.buttonText}>分享</Text>
            </TouchableOpacity>
          </View>

          {/* 底部裝飾 */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>願以此功德，普及於一切</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 其他頁面（暫時顯示簡單信息）
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{currentPage} - 開發中</Text>
      <TouchableOpacity style={styles.backButton} onPress={goHome}>
        <Text style={styles.backButtonText}>返回首頁</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2F4F4F',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 36,
  },
  subTitle: {
    fontSize: 18,
    color: '#696969',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 16,
    color: '#8B7355',
    fontStyle: 'italic',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
  },
  placeholderText: {
    fontSize: 24,
    color: '#2F4F4F',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
