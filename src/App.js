import { useState } from "react";
import { Formik, Form, Field } from "formik";
import './header.css'
import './container.css'
import './article.css'


const App = () => {
  const [photos, setPhotos] = useState([])
  console.log({photos})
  const open = url => {
    window.open(url)
  }
  return (
    <div>
      <header>
        <Formik
          initialValues = {{ search: '' }}
          onSubmit = { async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
            {
              headers: {
                'Authorization': 'Client-ID VfIIny6eJit5HcqAPxqSwoEldbCWBee6KpOlYs49-UM',
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" />
          </Form>

        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.raw} />
              <p> {photo.alt_description.charAt(0).toUpperCase() + photo.alt_description.slice(1).toLowerCase()} </p>
            </article>
            )}
        </div>
      </div>
      
    </div>
  )
}

export default App;
