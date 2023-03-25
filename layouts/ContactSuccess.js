import { markdownify } from "@lib/utils/textConverter";


const ContactSuccess = ({ data }) => {
    const { frontmatter } = data;
    const { title, info } = frontmatter;

  return (
    <section className="section">
      <div className="container">
        <div className="section row pb-0">
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h3")}
            {markdownify(info.description, "p", "mt-4")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSuccess;
