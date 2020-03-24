import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
	render() {
		return (
			<PlacesAutocomplete
				value={this.props.myValue}
				onChange={this.props.handleplace}
				onSelect={this.props.selectHandle}
				autoComplete="off"
				
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div className="autocomplete-root" >
						<input
							{...getInputProps({
								className: 'form-control',
								placeholder: 'Enter City*',
								autoFocus: true,
								
							})}
						/>
						<div className="autocomplete-dropdown" style={{maxHeight:"50px",overflow:"auto",background:"white",boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)"}}>
							{loading && <div>Loading...</div>}
							{suggestions.map((suggestion) => {
								const className = suggestion.active
									? 'suggestion-item--active'
									: 'suggestion-item';
								return (
									<div {...getSuggestionItemProps(suggestion, { className })}>
										{suggestion.description}
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}

export default LocationSearchInput;
