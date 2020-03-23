import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
	render() {
        
		return (
			<PlacesAutocomplete
				value={this.props.myValue}
				onChange={this.props.handleplace}
                onSelect={this.props.selectHandle}
				autoComplete ="off"
			
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div className="autocomplete-root">
						<input
							{...getInputProps({
								className: 'form-control',
								placeholder: 'Enter City'
							})}
						/>
						<div className="autocomplete-dropdown-container">
							{loading && <div>Loading...</div>}
							{suggestions.map((suggestion) => (
								<div {...getSuggestionItemProps(suggestion)}>
									<span>{suggestion.description}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}

export default LocationSearchInput;
