# 벨리코 웹사이트 사용 가이드

## 시스템 개요
이 벨리코 웹사이트는 맞춤형 깔창 회사의 제품 소개 및 고객 문의를 위한 웹사이트입니다.

## 주요 기능

### 1. 웹사이트 실행
```bash
npm start
# 서버가 http://localhost:3060 에서 실행됩니다
```

### 2. 향상된 관리자 패널 - 완전한 파일 관리 시스템
- **URL**: `http://localhost:3060/admin`
- **기능**: Google Drive "새 폴더"의 이미지들을 효율적으로 관리
- **지원 형식**: JPG, PNG, GIF, WEBP (최대 10MB per file, 동시 10개 파일)
- **새로운 기능들**:
  - ✅ **드래그앤드롭 업로드**: 직관적인 파일 업로드
  - ✅ **일괄 선택/삭제**: 체크박스로 여러 파일 동시 관리
  - ✅ **개별 파일 삭제**: 호버 시 나타나는 삭제 버튼
  - ✅ **이미지 미리보기**: 클릭하면 풀사이즈 모달로 보기
  - ✅ **Google Drive 가이드**: 단계별 다운로드 안내
  - ✅ **실시간 진행률**: 업로드 상태 시각적 표시
  - ✅ **반응형 디자인**: 모바일/태블릿 최적화

### 3. API 엔드포인트
- `GET /api/new-folder-files`: 업로드된 파일 목록 조회
- `POST /upload`: 파일 업로드 (multipart/form-data)
- `DELETE /api/delete-file/:filename`: 개별 파일 삭제
- `POST /api/delete-files`: 다중 파일 배치 삭제
- `GET /api/stats`: 실시간 통계 데이터
- `POST /contact`: 고객 문의 접수

### 4. 실시간 기능
- 고객 만족도 통계 (30초마다 자동 갱신)
- 새 폴더 업로드 이미지 (1분마다 자동 갱신)
- 동적 파일 관리 및 즉시 반영

## Google Drive 연동 대안책
원래 Google Drive API 자동 연동을 시도했으나 네트워크 문제로 인해 수동 업로드 방식으로 대체했습니다.

### 사용 방법:
1. Google Drive "g:\My Drive\Belico\새 폴더"에서 이미지 파일들을 로컬로 다운로드
2. `http://localhost:3060/admin`에 접속
3. 드래그앤드롭 또는 파일 선택으로 이미지 업로드
4. 메인 웹사이트에서 "최신 업로드" 섹션 확인

## 파일 구조
```
/public/images/new-folder/     # 업로드된 이미지 저장소
/views/admin.ejs              # 관리자 업로드 패널
/views/index.ejs              # 메인 웹사이트
/server.js                    # Express 서버 메인 파일
```

## 유지보수
- 업로드 파일은 `public/images/new-folder/` 디렉토리에 timestamp 접두사와 함께 저장
- 서버 재시작 시 npm start 명령 사용
- 포트는 환경변수 PORT 또는 기본값 3060 사용

## 배포
현재 로컬 개발 환경용으로 구성. 프로덕션 배포 시 환경변수 설정 및 보안 강화 필요.