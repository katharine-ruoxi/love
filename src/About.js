import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import GoHeart from 'react-icons/lib/go/heart'

class About extends Component {
  render() {
    return (
      <Grid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row
          className="text-center"
          style={{ marginTop: 80, marginBottom: 20 }}
        >
          <Col xs={12}>
            <a
              href={`${process.env.PUBLIC_URL}/`}
              style={{ textDecoration: 'none' }}
            >
              <h1 className="page-title white">FALLING LOVES</h1>
            </a>
          </Col>
        </Row>
        <Row
          style={{ marginBottom: 20, color: 'white', wordWrap: 'break-word' }}
        >
          <Col xs={1} md={3} />
          <Col xs={10} md={6}>
            <p>
              This website was initially created for the girl I like, but now I've
              made it customizable so that you can share it with your own love.
              For instance, if the name of your love were Simone, and the day
              you fell in love with her were October 14, 1929 (Guess{' '}
              <a href="https://en.wikipedia.org/wiki/Jean-Paul_Sartre">
                who were you?
              </a>), your customized URL would be{' '}
              <a href={`${window.location.origin}/Simone/1929/10/14`}>
                {`${window.location.origin}/Simone/1929/10/14`}
              </a>{' '}
              .
            </p>

            <p>
              The webpage was built using HTML5 canvas and React. In the page,
              there are falling loves in the background. And yes, I was just
              trying to play with the phrase "fall in love". (Did you know that
              Robin Gibb's song{' '}
              <a href="https://en.wikipedia.org/wiki/Boys_Do_Fall_in_Love">
                "Boys Do Fall in Love"
              </a>{' '}
              was covered by{' '}
              <a href="https://en.wikipedia.org/wiki/Parokya_ni_Edgar">
                a Filipino band
              </a>{' '}
              under the title "Boys Do Falling Love"?)
            </p>

            <p>
              This project was inspired by{' '}
              <a href="http://love.hackerzhou.me">http://love.hackerzhou.me</a>{' '}
              , and you can read its background story{' '}
              <a href="http://hackerzhou.me/2011/11/programmers-romantic-1st-anniversary-website.html">
                here
              </a>{' '}
              (in Chinese). Unfortunately, the couple broke up eventually, so
              the page{' '}
              <a href="http://love.hackerzhou.me">http://love.hackerzhou.me</a>{' '}
              is not available any more, but you can still obtain{' '}
              <a href="https://github.com/hackerzhou/Love">its source code</a> .
            </p>

            <p>
              The source code for this website is on{' '}
              <a href="https://github.com/stevenliuyi/love">Github</a> .
            </p>
          </Col>
          <Col xs={1} md={3} />
        </Row>
        <Row className="text-center" style={{ marginBottom: 80 }}>
          <Col xs={12}>
            <a href={`${process.env.PUBLIC_URL}/`}>
              <GoHeart size={30} color="white" style={{ marginRight: 5 }} />
            </a>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default About
