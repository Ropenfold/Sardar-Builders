import { markdownify } from "@lib/utils/textConverter";
import { useState } from "react";


const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => { 
    e.preventDefault()
    console.log('Sending')
    let data = {
      name,
      email,
      message,
      subject
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      console.log('res', res);
      console.log('Response received')
      if (res.status === 200) {
        console.log('Response succeeded!')
        setSubmitted(true)
        setName('')
        setEmail('')
        setSubject('')
      }
    })
  }

  const resetForm = () => {
    setSubmitted(false)
  }

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            {/* {!submitted ? 
            <form
              className="contact-form"
            >
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                  onChange={(e)=>{setEmail(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                  onChange={(e)=>{setSubject(e.target.value)}}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  placeholder="Your message"
                  name="message"
                  onChange={(e)=>{setMessage(e.target.value)}}
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={(e)=>{handleSubmit(e)}}>
                Send Now
              </button>
            </form>
: <><h2 className="text-center font-normal">Thanks for your message!</h2><button className=" btn btn-primary center" onClick={() => resetForm()}>Send Again</button></> } */}
          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
