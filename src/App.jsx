

import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase'; // 1단계에서 만든 설정 파일
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import './App.css'; // 기본 CSS (아래에 제공)

function App() {
  const [musicList, setMusicList] = useState([]);

  // 1. Firestore에서 음악 목록 가져오기
  useEffect(() => {
    const fetchMusic = async () => {
      const querySnapshot = await getDocs(collection(db, "music"));
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMusicList(list);
    };
    fetchMusic();
  }, []);

  // 2. 다운로드 핸들러 (핵심 로직)
  const handleDownload = async (musicItem) => {
    // 2-1. 출처 표기 약속 받기
    const isAgreed = window.confirm(
      `[출처 표기 약속]\n\n아래 출처를 영상 설명란에 꼭 표기해주세요.\n\n"${musicItem.sourceText}"\n\n약속하십니까?`
    );

    // 2-2. 약속한 경우에만 실행
    if (isAgreed) {
      try {
        // 2-3. (데이터 수집) Firestore의 downloadCount 1 증가
        const musicDocRef = doc(db, "music", musicItem.id);
        await updateDoc(musicDocRef, {
          downloadCount: increment(1)
        });

        // 2-4. (알맹이 제공) Storage에서 다운로드 URL 가져오기
        const storageRef = ref(storage, `music/${musicItem.fileName}`);
        const url = await getDownloadURL(storageRef);

        // 2-5. (자동 다운로드) 링크를 생성하여 강제 클릭
        const link = document.createElement('a');
        link.href = url;
        link.download = musicItem.fileName; // 다운로드될 파일 이름
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } catch (error) {
        console.error("다운로드 오류:", error);
        alert("다운로드 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>HumanBGM (MVP)</h1>
        <p>AI가 아닌, '진짜 아티스트'의 음악. 출처 표기 후 무료로 사용하세요.</p>
      </header>
      <main>
        {musicList.map(music => (
          <div key={music.id} className="music-item">
            <h2>{music.title}</h2>
            <audio controls src={`/music-placeholder.mp3`}> 
              {/* 참고: 보안 정책상 Storage URL을 audio src에 바로 쓰기 복잡하므로, 
                  MVP에서는 재생 기능을 빼거나 파일명을 기반으로 public 폴더의 임시 파일을 쓰세요. 
                  여기서는 다운로드 로직에 집중합니다. */}
            </audio>
            <button onClick={() => handleDownload(music)}>
              다운로드
            </button>
            <p className="source-text">출처: {music.sourceText}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;