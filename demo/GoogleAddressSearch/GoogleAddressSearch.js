import React from 'react';
import PlacesAutocomplete,  {GoogleApiWrapper, geocodeByAddress, getLatLng } from '../../src/index';// 'google-place-auto-complete'
import { classnames } from '../utils/helps';

import GOOGLE_API_KEY from '../googleApiKey';

class GoogleAddressSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address:  '', 
      errorMessage: '',
      latitude:  null,
      longitude:  null,
      isGeocoding: false,
    };
  }

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: '',
    });

  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  render() {
    const {
      address,
      errorMessage,
      latitude,
      longitude,
      isGeocoding,
    } = this.state;

    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
          restrictionedCountry={'au'}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Google__search-bar-container">
                <div className="Google__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Google__search-input',
                    })}
                  />
                  {this.state.address.length > 0 && (
                    <button
                      className="Google__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Google__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames('Google__suggestion-item', {
                        'Google__suggestion-item--active': suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Google__error-message">{this.state.errorMessage}</div>
        )}

        {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3 className="Google__geocode-result-header">Geocode result</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Google__spinner" />
              </div>
            ) : (
              <div>
                <div className="Google__geocode-result-item--lat">
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div className="Google__geocode-result-item--lng">
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
          </div>
        )} 
      </div>
    );
  }
}


export default GoogleApiWrapper({apiKey: GOOGLE_API_KEY })(GoogleAddressSearch)
