import React from 'react'

import { PageTemplate } from 'containers'
import { Link } from 'react-router'

const HomePage = ( {user_state, children, ...props}) => {
  return (
    <PageTemplate {...props}>
    <div className="container">
      <h1>Problem Solving For You</h1>
      <h2>Announcement</h2>
      <ul>
      <li>
      추가하고 싶은 기능이 있으시면 <a href="https://github.com/kajebiii/ps4u.kajebiii.com">GitHub</a>에 Issue를 등록해주세요.
      </li>
      </ul>
      <h2>Login</h2>
      <ul>
      <li>
        <Link to="/handle-login">Login</Link><br/>
        handle 정보로 로그인 할 수 있습니다.
      </li>
      </ul>
      <h2>Atcoder</h2>
      <ul>
      <li>
        <Link to="/atcoder">Atcoder Problem Chest</Link><br/>
        Atcoder 궤짝을 볼 수 있습니다.
      </li>
      </ul>
      <h2>BOJ</h2>
      <ul>
      <li>
        <Link to="/kajebiii/boj">kajebiii AC Problem List in BOJ</Link><br/>
        BOJ에서 kajebiii가 AC받은 코드를 확인할 수 있습니다.
      </li>
      <li>
        <Link to="/boj/contest">BOJ Contest Chest</Link><br/>
        BOJ Contest에 대한 궤짝을 볼 수 있습니다.
      </li>
      </ul>
      <h2>Utility</h2>
      <ul>
      <li>
        <Link to="/code-to-image">C++ Code To Image</Link><br/>
        C++ Code를 입력하면 Image로 바꾸어 줍니다.
      </li>
      <li>
        <Link to="/realtime-markdown">Realtime Markdown Editor With Mathjax</Link><br/>
        텍스트 기반의 마크업언어 Markdown를 실시간으로 작업할 수 있습니다.
      </li>
      </ul>
      {children}
    </div>
    </PageTemplate>
  )
}

export default HomePage
