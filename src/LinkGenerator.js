import React, { Component } from 'react'
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap'
import GoHeart from 'react-icons/lib/go/heart'
import GoMarkGithub from 'react-icons/lib/go/mark-github'
import GoInfo from 'react-icons/lib/go/info'
import GoClippy from 'react-icons/lib/go/clippy'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import moment from 'moment'

class LinkGenerator extends Component {
  state = {
    name: '',
    year: '',
    month: 1,
    day: 1,
    daysInMonth: 31
  }

  getLink() {
    return encodeURI(
      `${window.location.origin}/${this.state.name}/${this.state.year}/${
        this.state.month
      }/${this.state.day}`
    )
  }

  getLinkStyle() {
    const showLink =
      this.state.name !== '' && this.state.year !== '' && this.checkInput()
    return showLink ? { visibility: 'visible' } : { visibility: 'hidden' }
  }

  getMessageStyle() {
    const showMessage = this.state.name !== '' && this.state.year !== ''
    return showMessage ? { visibility: 'visible' } : { visibility: 'hidden' }
  }

  getDaysInMonth() {
    const daysInMonth = moment(
      `${this.state.year
        .toString()
        .padStart(4, '0')}-${this.state.month.toString().padStart(2, '0')}`,
      'YYYY-MM'
    ).daysInMonth()
    return daysInMonth > 0 ? daysInMonth : moment().daysInMonth()
  }

  checkInput(returnMessage = false) {
    const date = moment(
      `${this.state.year
        .toString()
        .padStart(4, '0')}-${this.state.month
        .toString()
        .padStart(2, '0')}-${this.state.day.toString().padStart(2, '0')}`,
      'YYYY-MM-DD',
      true
    )

    if (!date.isValid()) {
      return returnMessage ? 'Oops! The date you entered is invalid.' : false
    } else if (date.diff(moment(), 'days') > 0) {
      return returnMessage
        ? 'Oops! The date you entered is in the future.'
        : false
    } else {
      return returnMessage ? 'Your personal link is' : true
    }
  }

  render() {
    return (
      <Grid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row
          className="text-center"
          style={{ marginTop: 80, marginBottom: 20 }}
        >
          <Col xs={12}>
            <a
              href={`${process.env.PUBLIC_URL}/home`}
              style={{ textDecoration: 'none' }}
            >
              <h1 className="page-title white">FALLING LOVES</h1>
            </a>
          </Col>
        </Row>
        <Row className="text-center" style={{ marginBottom: 20 }}>
          <Col xs={12} className="white">
            Enter the following information to generate a special web page for
            your love:
          </Col>
        </Row>
        <Row
          style={{ marginBottom: 20, color: 'white', wordWrap: 'break-word' }}
        >
          <Col xsOffset={1} smOffset={2} mdOffset={3} xs={10} sm={8} md={6}>
            <Form horizontal>
              <FormGroup bsSize="large">
                <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Col componentClass={ControlLabel} xs={12} sm={6}>
                    HIS/HER NAME
                  </Col>
                  <Col className="padding-2" xs={12} sm={6}>
                    <FormControl
                      type="text"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup bsSize="large">
                <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Col componentClass={ControlLabel} xs={12} sm={7} md={6}>
                    THE DAY YOU FELL IN LOVE
                  </Col>
                  <Col xs={12} sm={5} md={6}>
                    <Row style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Col className="padding-2" xs={4}>
                        <FormControl
                          type="text"
                          placeholder="Year"
                          value={this.state.year}
                          onChange={e =>
                            this.setState({ year: e.target.value })
                          }
                        />
                      </Col>
                      <Col className="padding-2" xs={4}>
                        <FormControl
                          componentClass="select"
                          value={this.state.month}
                          onChange={e =>
                            this.setState({ month: e.target.value })
                          }
                        >
                          {Array(12)
                            .fill()
                            .map((_, i) => (
                              <option value={i + 1} key={`month-${i + 1}`}>
                                {i + 1}
                              </option>
                            ))}
                        </FormControl>
                      </Col>
                      <Col className="padding-2" xs={4}>
                        <FormControl
                          componentClass="select"
                          value={this.state.day}
                          onChange={e => this.setState({ day: e.target.value })}
                        >
                          {Array(this.getDaysInMonth())
                            .fill()
                            .map((_, i) => (
                              <option value={i + 1} key={`day-${i + 1}`}>
                                {i + 1}
                              </option>
                            ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row className="text-center" style={{ marginBottom: 30 }}>
          <Col xs={12}>
            <span className="white" style={this.getMessageStyle()}>
              {this.checkInput(true)}
            </span>
          </Col>
          <Col xs={12} style={this.getLinkStyle()}>
            <a href={this.getLink()} className="white">
              <span className="h4 white">{this.getLink()}</span>
            </a>{' '}
            <CopyToClipboard text={this.getLink()}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="copy">copy URL</Tooltip>}
              >
                <GoClippy
                  size={20}
                  color="white"
                  style={{ verticalAlign: 'text-bottom', cursor: 'pointer' }}
                />
              </OverlayTrigger>
            </CopyToClipboard>
          </Col>
        </Row>
        <Row className="text-center" style={{ marginBottom: 80 }}>
          <Col xs={12}>
            <a href={`${process.env.PUBLIC_URL}/home`}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="demo">Demo</Tooltip>}
              >
                <GoHeart size={30} color="white" style={{ marginRight: 5 }} />
              </OverlayTrigger>
            </a>
            <a href={`${process.env.PUBLIC_URL}/about`}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="about">About</Tooltip>}
              >
                <GoInfo size={30} color="white" />
              </OverlayTrigger>
            </a>
            <a href="https://github.com/stevenliuyi/love">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="github">Github</Tooltip>}
              >
                <GoMarkGithub
                  size={26}
                  color="white"
                  style={{ marginLeft: 10 }}
                />
              </OverlayTrigger>
            </a>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default LinkGenerator
