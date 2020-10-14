import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import dayjs from "dayjs"
import { csrfToken } from 'rails-ujs'

class ReportForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: dayjs().format("YYYY-MM-DD")
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios
      .post('/reports', {
        date: this.state.date,
        impression: this.state.impression
      })
      .then((response) => {
      }, (error) => {
        console.log(error)
      });
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="reportDate">日付</label>
        <input type="date"
               id="reportDate"
               name="date"
               value={this.state.date}
               onChange={this.handleChange}
        />
        <label htmlFor="reportImpression">感想</label>
        <textarea id="reportImpression"
                  name="impression"
                  value={this.state.impression}
                  onChange={this.handleChange}
        />
        <input type="submit" value="保存する" />
      </form>
    );
  }
}

ReactDOM.render(
  <ReportForm />,
  document.getElementById('reportForm')
)
