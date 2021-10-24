import React, { useState, useEffect} from 'react';
import Searchbar from './Components/Searchbar/Searchbar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import API from './Components/ApiService/Api';
import ErrorView from "./Components/ErrorView/ErrorView";
import LoadingView from "./Components/Loader/Loader";
import Button from "./Components/Button/Button";

import s from './App.css';

export default function App() {
  const [searchRequest, setSearchRequest] = useState('');
  const [page, setPage] = useState(null);
  const [pics, setPics] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle');
  const [button, setButton] = useState(false);

  useEffect(() => {
    if (searchRequest === '') {
      return setError('Please enter something...');
    }  
    setStatus('pending');
    API.fetchImages(searchRequest, page)
      .then((images) => {        
        if (images.total !== 0) {
          setStatus('resolved');
            setPics((prevImages) => [...prevImages, ...images.hits]);
            setButton(true);
           } else {
            setStatus('rejected')
            setError('Nothing found...')
          }
      })
      .catch(error => {
          setError(error);
          setStatus('rejected');
      })
      .finally(handlePageScroll);
}, [searchRequest, page, pics]);
  
  const handlePageScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleBtnClick = () => {
    setPage(page => page + 1)
  };

  const handleSubmit = (searchRequest, page) => {
    setSearchRequest(searchRequest);
    setPage(page);
    setPics([]);
  }
 
  return (
    <div>
     <Searchbar onSubmit={handleSubmit} />
     {status === 'idle' && <div className={s.starter}>Let`s find some pictures!</div>}
     {status === 'pending' && <LoadingView />}
     {status === 'rejected' && <ErrorView message={error} />}
     {status === 'resolved' && <ImageGallery images={pics} />}
     {button && <Button onClick={handleBtnClick} />}
    </div>
  );
}
