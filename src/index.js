import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./style.css";

class IncorporationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      courseId: null,
      subject: null,
      teacher: null,
      chapter: null,
      courseCard: '',
      shareholders: [{ 
        topic: "", 
        subTopic: "",
        path: ""
      }]
    };
  }

  handleCourseIdChange = evt => {
    this.setState({ courseId: evt.target.value });
  };

  handleTeacherNameChange = evt => {
    this.setState({ teacher: evt.target.value });
  };

  SubjectChange = evt => {
    this.setState({ subject: evt.target.value });
  }

  chapterChange = evt => {
    this.setState({ chapter: evt.target.value });
  }

  courseCardChange = evt => {
    this.setState({ courseCard: evt.target.value });
  }


  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value, address: "abc" };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleTopicChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, topic: evt.target.value, subTopic: this.state.shareholders[idx].subTopic, path: this.state.shareholders[idx].path };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleSubTopicChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, subTopic: evt.target.value, topic: this.state.shareholders[idx].topic, path: this.state.shareholders[idx].path };
    });

    this.setState({ shareholders: newShareholders });
  };

  handlePathChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, path: evt.target.value, topic: this.state.shareholders[idx].topic, subTopic: this.state.shareholders[idx].subTopic };
    });

    this.setState({ shareholders: newShareholders });
  };


  addNewBlock = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ topic: "", subTopic: "", path: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  convertToBase64=async() => {
    


    let objJsonStr = JSON.stringify(this.state.shareholders);
    console.log(objJsonStr)
    let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
    console.log('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'+objJsonB64)

    const data = {
      "name": "navin",
      "courseId": this.state.courseId,
      "subject": this.state.subject,
      "teacher": this.state.teacher,
      "chapter": this.state.chapter,
      "courseCard": this.state.courseCard,
      "blocks": objJsonB64
    }

    axios('https://classcast-198812.appspot.com/users/createCourse', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
    }).then((response) => response.data)

    const options = {
      method: 'POST',
      crossdomain: true,
      mode: 'no-cors',
      credentials: 'same-origin',
      headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
      proxy: {
        host: 'http://172.29.10.161',
        port: '3000'
      },
      data: data,
      url: 'https://classcast-198812.appspot.com/users/createCourse',
    };
    axios(options); 


    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(`https://classcast-198812.appspot.com/users/createCourse`, data)
      .then((response) => response.data)
      .catch((error) => error);


  }

  render() {
    const data = {
      "courseId": this.state.courseId,
      "subject": this.state.subject,
      "teacher": this.state.teacher,
      "chapter": this.state.chapter,
      "courseCard": this.state.courseCard,
      "blocks": this.state.shareholders
    }
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(this.state.shareholders))
    return (
      <div class="container" align="center" style={{width: '100%'}}>
        <p style={{width: '100%', backgroundColor: 'grey', height: 100, marginBottom: 60, alignItems: 'center', justifyContent: 'center'}} align="center">
            <h2 style={{color: 'white', alignSelf: 'center', textAlign: 'center'}}>Admin Panel</h2>
          </p>
        <form>
          <h4> Course Id </h4>  
          <input
            type="text"
            placeholder="Course Id, e.g. MA1201HC"
            value={this.state.courseId}
            style={{width: '30%'}}
            onChange={this.handleCourseIdChange}
          />

          <h4> Teacher Name </h4>  
          <input
            type="text"
            placeholder="Teacher Name"
            value={this.state.teacher}
            style={{width: '30%'}}
            onChange={this.handleTeacherNameChange}
          />

          <h4> Subject </h4>  
          <input
            type="text"
            placeholder="Subject Name, e.g. Physics"
            value={this.state.subject}
            style={{width: '30%'}}
            onChange={this.SubjectChange}
          />

          <h4> Chapter </h4>  
          <input
            type="text"
            placeholder="Chapter Name, e.g. Atoms"
            value={this.state.chapter}
            style={{width: '30%'}}
            onChange={this.chapterChange}
          />

          <h4> Course Card Url </h4>  
          <input
            type="text"
            placeholder="Course Card URL"
            value={this.state.courseCard}
            style={{width: '30%'}}
            onChange={this.courseCardChange}
          />

          <h4>Blocks</h4>

          {this.state.shareholders.map((shareholder, idx) => (
            <div className="shareholder" >

              <input
                type="text"
                placeholder={`Block ${idx + 1} Topic Name`}
                value={shareholder.topic}
                style={{margin: 20}}
                onChange={this.handleTopicChange(idx)}
              />
              <input
                type="text"
                placeholder={`Block ${idx + 1} Sub-Topic Name`}
                value={shareholder.subTopic}
                style={{margin: 20}}
                onChange={this.handleSubTopicChange(idx)}
              />
              <input
                type="text"
                placeholder={`Block ${idx + 1} Path`}
                value={shareholder.path}
                style={{margin: 20}}
                onChange={this.handlePathChange(idx)}
              />
              <button
                type="button"
                onClick={this.convertToBase64}
                style={{height: 30, width: 60, borderRadius: 15}}
                className="big"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={this.addNewBlock}
            className="small"
          >
            Add Block
          </button>
          <button onClick={this.convertToBase64} style={{width: '30%'}}>Create</button>
          <button onClick={this.convertToBase64} style={{width: '30%'}}>Create</button>
        </form>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<IncorporationForm />, rootElement);
