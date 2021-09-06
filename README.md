<div align="center">

  ![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=CUHAON&fontSize=90&desc=BACKEND&descAlignY=65)
  <h3><strong>:white_square_button:KUSIS 위헙 헌팅형 CTF 프레임워크 프로젝트:white_square_button:</strong></h3>
  <h3>:computer: Develop :computer:</h3>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-CC2929?style=flat-square&logo=Express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/>
  <img src="https://img.shields.io/badge/Ubuntu-E95420?style=flat-square&logo=Ubuntu&logoColor=white"/>

   <h3>:point_right: Contact :point_left:</h3>
   <a href="https://discord.gg/Tgps9mBn"><img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white"/></a>
  <br>
  <h3>:white_check_mark:ERD모델:white_check_mark:</h3>
  <br>
  
  ![Untitled Diagram drawio](https://user-images.githubusercontent.com/75434755/132237863-9c60d7ef-f5fd-49d0-a645-ef2b7a08205e.png)

</div>

### :pencil2:수정일지  

- **21/09/07**  
  /views/forum/index.ejs, /views/forum/board.ejs, /controllers/forum.ctrl.js
  
  > 포럼 페이징 추가, Forum DB게시물 출력
  > 작성자: 문영민  

- **21/09/05**  
  >forum 연결, db추가, common forum추가, css깨지면 style -> font-size추가할것  
  > 작성자: 김광운  

- **21/08/26**  
  >admin Member 수정기능 추가, 병합 후 커밋    
  > 작성자: 문영민  

- **21/08/23**  
  >커밋 충돌로 직전 개발분 전량 덮어씌움  
  >개발 전 git pull, 혹은 clone후에 커밋 바람  
  > 작성자: 문영민  

- **21/08/07**  
  /views/admin/, /views/common/head.ejs, /views/index.ejs, /views/login.ejs, /views/join.ejs, /routes/admin.js, /controllers/admin.ctrl.js
  
  > admin, admin.ctrl.js 경로 수정  
  > ejs 공통 head 템플릿  
  > 작성자: 김태형
- **21/08/07**  
  admin , /schemas/user.js , index.js , routes/admin.js , /controllers/admin.ctrl.js , views/admin/membersBoard , ./config/winston.js

  > admin 로그인 페이지 추가  
  > user db rolltype 추가  
  > winston 적용, config폴더 추가  
  > admin member보드 user적용  
  > admin 페이징 적용  
  > admin wargame 링크 연결 적용  
  > 작성자: 김광운 , 문영민

- **21/08/06**  
  /controllers/index.ctrl

  > views count 기능 추가  
  > solved count 기능 추가  
  > 작성자: 김광운

- **21/08/02**  
  /controllers/index.ctrl

  > 오타 오류 수정  
  > 작성자: 김광운

- **21/08/02**  
  /controllers/index.ctrl , /schemas/user.js

  > 정답일경우 user.js point 추가  
  > user.db에 point값 추가  
  > 작성자: 김광운

- **21/07/27**  
  /controllers/index.ctrl , /routes/index.js , /schemas/whoSolved.js 생성 , /views/wargame/view.ejs 수정

  > index.ctrl = wargame flag 복수정답 방지 적용  
  > index.js = params값 수정  
  > whoSolved.js = 새로운 db 생성  
  > view.ejs = flag post에서 넘겨주는 값 수정  
  > 작성자: 김광운

- **21/07/25**  
  /controllers/index.ctrl , /routes/index.js , /views/wargame/create.ejs , /views/wargame/view.ejs 수정

  > index.ctrl = wargame flag 검증기능 적용  
  > index.js = wargame flag 검증 라우팅  
  > create.ejs = summernote script 수정  
  > view.ejs = textarea name 수정, summernote 태그오류 수정  
  > 작성자: 김광운

- **21/07/22**  
  /controllers/index.ctrl, controllers/common/validator, create.ejs, view.ejs 수정

  > validator로 create, comment 에러 검증 적용  
  > wargame검색결과가 없다면 안내문 출력  
  > 스마트에디터 적용  
  > 작성자 : 문영민

- **21/07/21**  
  /controllers/index.ctrl, controllers/common/action, middlewares.js ,auth.ctrl 수정

  > common폴더 생성, 기존 common.js는 action.js로 변경. validator폴더 추가  
  > validator로 join빈문자열 검증, 예외 처리  
  > 404에러, 에러핸들러 적용  
  > 작성자 : 문영민

- **21/07/20**  
  /controllers/index.ctrl 수정

  > common.js 생성, 공통적으로 쓰이는 일반 함수들이 들어갈 예정  
  > paging함수 common.js에 등록  
  > searchKeyword함수 common.js에 등록  
  > 작성자 : 문영민

- **21/07/19**  
  /controllers/index.ctrl , /views/wargame/index.ejs 수정

  > 함수명 수정  
  > 작성자 : 문영민

- **21/07/16**  
  /controllers/index.ctrl , /views/wargame/index.ejs, /views/wargame/view.ejs 수정

  > wargame 검색 기능 적용  
  > comment 수정(의견 수 표시)  
  > ~~검색시 페이지가 남고, 페이지 이동시 초기화되는 버그 있음.~~(해결)  
  > 작성자 : 문영민

- **21/07/15**  
  /controllers/index.ctrl 수정
  > 문서 정리  
  > wargame페이징, comment페이징 적용  
  > wargame/index.ejs의 154번 줄 for(...)문 => foreach문으로 수정  
  > 작성자 : 문영민
