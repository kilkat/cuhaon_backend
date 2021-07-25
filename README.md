# cuhaon_backend
### 수정일지
__커밋이 안되면 readme 파일이 로컬저장소에 없어서 그럴 가능성이 높습니다. git pull한번 해주고 커밋하면 잘됩니다.__  
마크다운 사용법: https://gist.github.com/ihoneymon/652be052a0727ad59601  
+ __21/07/22__  
  /controllers/index.ctrl, controllers/common/validator, create.ejs, view.ejs 수정  
  >validator로 create, comment 에러 검증 적용   
  >wargame검색결과가 없다면 안내문 출력  
  >스마트에디터 적용   
  >작성자 : 문영민  

+ __21/07/21__  
  /controllers/index.ctrl, controllers/common/action, middlewares.js ,auth.ctrl 수정
  >common폴더 생성, 기존 common.js는 action.js로 변경. validator폴더 추가   
  >validator로 join빈문자열 검증, 예외 처리  
  >404에러, 에러핸들러 적용   
  >작성자 : 문영민   

+ __21/07/20__  
  /controllers/index.ctrl 수정  
  >common.js 생성, 공통적으로 쓰이는 일반 함수들이 들어갈 예정  
  >paging함수 common.js에 등록   
  >searchKeyword함수 common.js에 등록  
  >작성자 : 문영민  

+ __21/07/19__  
  /controllers/index.ctrl , /views/wargame/index.ejs 수정  
  >함수명 수정  
  >작성자 : 문영민  

+ __21/07/16__  
  /controllers/index.ctrl , /views/wargame/index.ejs, /views/wargame/view.ejs 수정  
  >wargame 검색 기능 적용  
  >comment 수정(의견 수 표시)  
  >~~검색시 페이지가 남고, 페이지 이동시 초기화되는 버그 있음.~~(해결)  
  >작성자 : 문영민  

+ __21/07/15__  
  /controllers/index.ctrl 수정  
  >문서 정리  
  >wargame페이징, comment페이징 적용  
  >wargame/index.ejs의 154번 줄 for(...)문 => foreach문으로 수정  
  >작성자 : 문영민  


+ __21/07/25__
  /controllers/index.ctrl , /routes/index.js , /views/wargame/create.ejs , /views/wargame/view.ejs 수정
  >index.ctrl = wargame flag 검증기능 적용
  >index.js = wargame flag 검증 라우팅
  >create.ejs = summernote script 수정 
  >view.ejs = textarea name 수정, summernote 태그오류 수정
  >작성자: 김광운
