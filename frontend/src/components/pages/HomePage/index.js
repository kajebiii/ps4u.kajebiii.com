import React from 'react'

import { PageTemplate } from 'components'

const HomePage = ( {user_state, children, ...props}) => {
  return (
    <PageTemplate {...props}>
    <div className="container">
      <h1>Problem Solving For You</h1>
      <h2>Announcement</h2>
      <ul>
      <li>
      마땅히 더 개발할게 없어서 잠시 개발을 멈추겠습니다.
      추가하고 싶은 기능이 있으시면 <a href="https://github.com/kajebiii/ps.kajebiii.ga">GitHub</a>에 Issue를 등록해주세요.
      </li>
      </ul>
      <h2>Login</h2>
      <ul>
      <li>
        {/*<a href="{{ url_for('login') }}">login({{session.get('id_BOJ', 'None')}})</a>*/}
        로그인 할 수 있습니다.
      </li>
      </ul>
      <h2>Atcoder</h2>
      <ul>
      <li>
        {/*<a href="{{ url_for('atcoderList') }}">Problem Chest</a><br>*/}
        Atcoder 궤짝을 볼 수 있습니다. 몇몇 문제의 번역도 확인할 수 있습니다.
      </li>
      </ul>
      <h2>BOJ</h2>
      <ul>
      <li>
        {/*<a href="{{ url_for('bojList') }}">kajebiii's AC Problem List</a><br>*/}
        BOJ에서 kajebiii가 AC받은 코드를 확인할 수 있습니다.
      </li>
      <li>
        {/*<a href="{{ url_for('chestBOJ') }}">Category Chest({{session.get('id_BOJ', 'None')}})</a><br>*/}
        BOJ Category에 대한 궤짝을 볼 수 있습니다.
      </li>
      </ul>
      <h2>Utility</h2>
      <ul>
      <li>
        {/*<a href="{{ url_for('codeToImage') }}">Code To Image (C++)</a><br>*/}
        C++ Code를 입력하면 Image로 바꾸어 줍니다.
      </li>
      <li>
        {/*<a href="{{ url_for('realtimeMarkdownEditor') }}">Realtime Markdown Editor With Mathjax</a><br>*/}
        텍스트 기반의 마크업언어 Markdown를 실시간으로 작업할 수 있습니다.
      </li>
      </ul>
      <h2>Update</h2>
      <ul>
      <li>2018-04-28 : BOJ Chest 링크에  ?search=검색어 를 붙여서 접근 가능하게함</li>
      <li>2018-03-14 : Atcoder AC or WA 색 칠함</li>
      <li>2018-03-12 : Markdown with Mathjax 완성</li>
      <li>2018-03-08 : Atcoder 궤짝 추가</li>
      <li>2018-02-27 : 코드 다시 짬, GitHub로 관리 시작</li>
      <li>2018-02-26 : 서버가 날아감</li>
      </ul>
      <h2>To Do</h2>
      <ul>
      <li>개인 프로필 화면 추가</li>
      <li>BOJ 궤짝에 기능들 추가</li>
      <li>Codeforces 궤짝 추가</li>
      </ul>
      {
        /*
        user_state.username == "" 
        ? (<h1>로그인 이후 이용하실 수 있습니다.</h1>) 
        : (<h1>로그인 하였습니다. </h1>)
        */
      }
      {children}
    </div>
    </PageTemplate>
  )
}

export default HomePage
