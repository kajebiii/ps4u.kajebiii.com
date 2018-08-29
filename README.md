# [ps4u.kajebiii.com](https://ps4u.kajebiii.com)
## Frontend

### `/atcoder`
AGC, ARC, ABC 궤짝, Score로 보여주는 것 추가

### `/handle-login`
boj, atcoder 핸들로 로그인 가능
atcoder 핸들 입력시 제출정보 가져옴.

### `/kajebiii/boj`
add kajebiiBOJSubmissionPage

### `/kajebiii/boj/[problem_id]`
add kajebiiBOJCodePage

### `/realtimemarkdown`
add RealtimeMarkdownPage

## Backend
### `/api/atcoder/problem-list/[atcoder_id]/`
`[atcoder_id]`가 주어지면, 제출한 문제에 대해서 맞았는지 틀렸는지 결과 알려줌.

### `/api/atcoder/base-information/`
atcoder 문제들 리스트 주어짐. 지금은 기본적으로 AGC, ARC, ABC만 주어짐.

### `/api/kajebiii/boj/last-ac-source/[problem_id]/`
BOJ에서 kajebiii가 `[problem_id]`번을 AC 받은 마지막 코드

### `/api/boj/ac-problem-list/[boj_id]/`
`[boj_id]`가 BOJ에서 AC 받은 문제 목록
