export const geocodeByAddress = address => {
  const geocoder = new window.google.maps.Geocoder();
  const OK = window.google.maps.GeocoderStatus.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status !== OK) {
        reject(status);
      }
      resolve(results);
    });
  });
};

export const getLatLng = result => {
  return new Promise((resolve, reject) => {
    try {
      const latLng = {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
      };
      resolve(latLng);
    } catch (e) {
      reject(e);
    }
  });
};

export const geocodeByPlaceId = placeId => {
  const geocoder = new window.google.maps.Geocoder();
  const OK = window.google.maps.GeocoderStatus.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== OK) {
        reject(status);
      }
      resolve(results);
    });
  });
};

export const compose = (...fns) => (...args) => {
  fns.forEach(fn => fn && fn(...args));
};

export const pick = (obj, ...props) => {
  return props.reduce((newObj, prop) => {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
    return newObj;
  }, {});
};


const isObject = val => {
  return typeof val === 'object' && val !== null;
};

export const classnames = (...args) => {
  const classes = [];
  args.forEach(arg => {
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (isObject(arg)) {
      Object.keys(arg).forEach(key => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    } else {
      throw new Error(
        '`classnames` only accepts string or object as arguments'
      );
    }
  });

  return classes.join(' ');
};
