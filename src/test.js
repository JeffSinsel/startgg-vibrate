const { useState, useEffect } = require('react');
const React = require('react');

const Example = () => {
  const [promiseValue, setPromiseValue] = useState(null);

  useEffect(() => {
    somePromiseFunction().then(result => setPromiseValue(result));
  }, []);

  return (
    <div>
      {promiseValue !== null ? (
        <p>The promise value is: {promiseValue}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Example;