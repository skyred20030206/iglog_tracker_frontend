<template>
  <div class="analysis-container">
    <div class="card">
      <h2>Instagram 關係分析</h2>
      <p class="subtitle">上傳您的 JSON 檔案以找出誰沒有回追你</p>

      <div class="upload-section">
        <div class="upload-group">
          <label>Followers (粉絲)</label>
          <div class="input-wrapper">
            <button type="button" class="btn-select" @click="followersInput.click()">
              選擇檔案
            </button>
            <span class="file-name">{{ followersName || '尚未選擇檔案...' }}</span>
            <input
              ref="followersInput"
              type="file"
              accept=".json"
              hidden
              @change="handleFileChange($event, 'followers')"
            />
          </div>
        </div>

        <div class="upload-group">
          <label>Following (追蹤中)</label>
          <div class="input-wrapper">
            <button type="button" class="btn-select" @click="followingInput.click()">
              選擇檔案
            </button>
            <span class="file-name">{{ followingName || '尚未選擇檔案...' }}</span>
            <input
              ref="followingInput"
              type="file"
              accept=".json"
              hidden
              @change="handleFileChange($event, 'following')"
            />
          </div>
        </div>
      </div>

      <button 
        class="btn-submit" 
        :disabled="isLoading" 
        @click="submitAnalysis"
      >
        <span v-if="isLoading" class="loader"></span>
        {{ isLoading ? '處理中...' : '送出分析' }}
      </button>
      <br/>
      <button 
        class="btn-submit" 
        @click="save_history"
      >
      儲存粉絲名單
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
// 狀態定義
const followersFile = ref(null);
const followingFile = ref(null);
const followersName = ref('');
const followingName = ref('');
const isLoading = ref(false);

// 模板引用 (Template Refs)
const followersInput = ref(null);
const followingInput = ref(null);


const readFileAsJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result)); // 解析成 JSON 物件
      } catch (e) {
        reject(new Error(`檔案 ${file.name} 內容不是正確的 JSON 格式`));
      }
    };
    reader.onerror = () => reject(new Error('讀取檔案失敗'));
    reader.readAsText(file);
  });
};

/**
 * 處理檔案選取
 */
const handleFileChange = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  if (type === 'followers') {
    followersFile.value = file;
    followersName.value = file.name;
  } else {
    followingFile.value = file;
    followingName.value = file.name;
  }
};

//儲存history
let save_history =async function(){
  const response = await fetch('/api/json/save_history', {method: 'POST'});
  const result = await response.json();
  if (result.ok){
    alert("儲存成功");
    router.go(0);
  }
  else{
    alert("儲存失敗");
  }
}

/**
 * 送出分析請求
 */
const submitAnalysis = async () => {
  // 1. 驗證
  if (!followersFile.value || !followingFile.value) {
    alert('請確保兩個檔案（Followers 與 Following）都已選取！');
    return;
  }

  isLoading.value = true;

  
  try {
    const followersData = await readFileAsJson(followersFile.value);
    const followingData = await readFileAsJson(followingFile.value);

    const response = await fetch('/api/json', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ 

                    follower: followersData,
                    following: followingData
                })
 
    });

    if (!response.ok) {
      throw new Error(`伺服器錯誤: ${response.status}`);
    }

    const result = await response.json();
    console.log('分析結果:', result);
    alert('分析完成！請查看控制台輸出。');
    router.go(0);
  } catch (error) {
    console.error('上傳失敗:', error);
    alert(error.message);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* 基礎容器佈局 */
.analysis-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* 卡片樣式 */
.card {
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

h2 {
  margin: 0 0 0.5rem 0;
  color: #1a1a1a;
  font-size: 1.5rem;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

/* 上傳區域佈局 */
.upload-section {
  text-align: left;
  margin-bottom: 2rem;
}

.upload-group {
  margin-bottom: 1.5rem;
}

.upload-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #444;
  font-size: 0.85rem;
}

/* 自訂輸入框組合 */
.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 5px;
  background: #fafafa;
  transition: border-color 0.2s;
}

.input-wrapper:focus-within {
  border-color: #4f46e5;
}

.file-name {
  flex: 1;
  padding: 0 12px;
  font-size: 0.85rem;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 按鈕樣式 */
.btn-select {
  background: #fff;
  border: 1px solid #ddd;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  color: #333;
  transition: all 0.2s;
}

.btn-select:hover {
  background: #f0f0f0;
  border-color: #ccc;
}

.btn-submit {
  width: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.btn-submit:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-submit:active {
  transform: translateY(0);
}

.btn-submit:disabled {
  background: #a5a5a5;
  cursor: not-allowed;
  transform: none;
}

/* Loading 動畫 */
.loader {
  width: 18px;
  height: 18px;
  border: 2px solid #ffffff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 手機版適應 */
@media (max-width: 480px) {
  .card {
    padding: 1.5rem;
  }
}
</style>