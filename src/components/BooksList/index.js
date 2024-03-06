import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import BookCard from '../BookCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const BooksList = () => {
  const [apiDetails, setApiDetails] = useState({
    apiStatus: apiStatusConstants.initial,
    responseData: null,
    errorMsg: null,
  })

  useEffect(() => {
    const getBooks = async () => {
      // Setting API Status to In Progress
      setApiDetails({
        apiStatus: apiStatusConstants.inProgress,
        responseData: null,
        errorMsg: null,
      })

      // Fetching the Data.
      const apiUrl = `https://ccbp-goodreads-apis.onrender.com/books/`
      const response = await fetch(apiUrl)
      const fetchedData = await response.json()

      if (response.ok) {
        //format and send the responseData
        const formattedData = fetchedData.map(book => ({
          bookId: book.book_id,
          title: book.title,
          authorId: book.author_id,
          rating: book.rating,
          ratingCount: book.rating_count,
          reviewCount: book.review_count,
          description: book.description,
          pages: book.pages,
          dateOfPublication: book.date_of_publication,
          editionLanguage: book.edition_language,
          price: book.price,
          onlineStores: book.online_stores,
        }))

        setApiDetails(prevApiDetails => ({
          ...prevApiDetails,
          apiStatus: apiStatusConstants.success,
          responseData: formattedData,
          errorMsg: null,
        }))
      } else {
        // Set the api failure and send error message.
        setApiDetails(prevApiDetails => ({
          ...prevApiDetails,
          apiStatus: apiStatusConstants.failure,
          responseData: null,
          errorMsg: fetchedData.error_msg,
        }))
      }
    }
    getBooks()
  }, [])

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  const renderBooksListView = () => {
    const {responseData} = apiDetails
    return (
      <div class="books-list-container">
        <ul className="books-list">
          {responseData.map(book => (
            <BookCard key={book.book_id} book={book} />
          ))}
        </ul>
      </div>
    )
  }
  const renderFailureView = () => {
    return <div>Something Went Wrong</div>
  }

  const renderBooks = () => {
    const {apiStatus} = apiDetails
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderBooksListView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return <>{renderBooks()}</>
}

export default BooksList
