// Helper function for reusable functions
// A great candidate is one that gets function
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// We will now have a race between the timeout function and the fetch of the url

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // this is a so called magic value

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${res.status} ${data.message}`);
    }
    return data;
  } catch (err) {
    throw err;
    // We propogated an error down from one async function to another by rethrowing the err in the catch block
  }
};
