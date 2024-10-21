# PlayListify #

## Overview ##

This project is a React web application called PlayListify. The application leverages React components, state management, and Spotify API integration to allow users to search the Spotify library, create personalized playlists, and save them directly to their Spotify accounts. The key functionalities include searching for tracks, managing playlist selections, and seamlessly interacting with the Spotify platform to update user playlists. 

## Feautures ##

* Users can search for songs by song title, album name, artist's name, genre, etc.
*  Users can see information about each song, such as the title, artist, and album of the songs they queried.
* Users can export their custom playlists to their personal Spotify account.

## Technologies Used ##

* HTML
* CSS
* JavaScript
* React
* Node.js
* Application Programming Interfaces (APIs)
* HTTP Requests and Responses
* Authentication

## Brief Outline ##

#### 1. Setting up Local Environment ####

#### 2. Creating components to structure the application. The core components of the interface included: ####

* App: This served as the main component, managing the overall functionality and state of the application.
* SearchBar: This component handles the user input for searching songs in the Spotify library.
* SearchResults: This displayed the list of songs returned from the search query.
* Playlist: This component allows users to create and manage their custom playlists.
* Tracklist: This was responsible for rendering a list of tracks, either from the search results or the playlist.
* Track: Each individual track was represented by this component, handling track-specific functionality such as adding or removing from the playlist.

#### 3. Implementing Track Listing in The Component Tree ####

For handling the display of song tracks retrieved from the Spotify API, the app was designed to follow a unidirectional data flow. The root component manages the search results data and passes it down to a child component responsible for rendering each track. Each track is displayed with its song name, artist, and album.

In the absence of an active Spotify API setup, an array of track objects was hard-coded to simulate the response. These track objects, containing properties like song name, artist, and album, were passed down through the component tree. The child component was tasked with iterating over the array and rendering each individual track accordingly, ensuring the structure was in place for future integration with the Spotify API.

#### 4. Implementing Playlists in The Component Tree

In the PlayListify app, functionality was implemented to allow users to customize their playlist title and tracks. When a user creates a playlist, the app is designed to display both the playlist name and the associated tracks.
    
To achieve this, a unidirectional data flow was established, starting from the root component. The root component managed the playlist name and track data, then passed this information down to the relevant child components. These components handled the rendering of the playlist name and the list of tracks, ensuring that any updates made by the user were properly reflected throughout the interface.

This structure ensured a clear and efficient data flow, allowing for seamless updates and rendering of the playlist as users customized their selections.

#### 5. Implementing Addition of Songs To a Custom Playlist

In the PlayListify app, functionality was built to allow users to add songs from the search results to their custom playlists. To implement this, a method was created that handles the addition of a selected song to the playlist when the user clicks the "add" button next to each track in the search results.

This method, housed in the root component, was triggered by the user's interaction with the "add" button. Once clicked, the selected song was passed to the method, which then updated the playlist by adding the track to the playlist array. This updated playlist was then passed down to the relevant child components, ensuring that the added track was immediately reflected in the custom playlist displayed in the app.

This approach allowed for a smooth and intuitive experience, enabling users to easily build their playlists from the search results.

#### 6. Implementing Removal of Songs From a Custom Playlist

In PlayListify, alongside the ability to add songs to a playlist, functionality was also implemented to allow users to remove songs from their playlists. This was achieved by creating a method that gets triggered when the user clicks the "remove" button displayed next to each track in the playlist.

When the "remove" button is clicked, the selected track is passed to this method, which removes the song from the playlist array. The updated playlist, with the track removed, is then passed down through the component tree, ensuring that the changes are immediately reflected in the user interface.

This feature provided users with full control over their playlists, allowing them to easily add and remove tracks as needed while maintaining a smooth and responsive interaction.

#### 7. Implementing Playlist Renaming

In PlayListify, customization was further enhanced by allowing users to rename their playlists. This feature gave users more control over their music experience by letting them easily update their playlist titles.

To implement this, functionality was added that allows users to click on the playlist title and modify it directly. When a user clicks on the title, it becomes an editable text field where they can type a new name. Once the user finishes typing and clicks away or hits Enter, the updated name is saved and reflected in the displayed playlist title.

This interactivity was managed through the state in the root component, which tracked the current playlist name and passed the updated name down to the relevant child components.

#### 8. Saving the Playlist to a User's Account

In PlayListify, one of the key features implemented was the ability for users to export their custom playlist and save it directly to their Spotify account. This functionality was designed to let users finalize their playlist and reset it within the app after saving.

To achieve this, a method was implemented that collects the necessary information, specifically focusing on the track's uri property, which Spotify uses to uniquely reference songs. The method builds an array of URIs from the tracks in the playlist, preparing it for submission to the Spotify API.

Although actual API interaction was deferred, mock data was used during development to test the feature. The method simulates saving the playlist by collecting the track URIs, resetting the playlist, and clearing the track list within the web app. This mock implementation ensured that the logic worked as expected, preparing the application for future integration with Spotify's services.

#### 9. Obtaining a Spotify Access Token

In PlayListify, a dedicated JavaScript module was created to handle the logic for obtaining and managing a user's Spotify access token, enabling the app to make requests to the Spotify API.

The module was designed with a method that retrieves the user's access token and stores it for future API requests. When a user interacts with the app and requires access to the Spotify API, the module first checks if a valid access token is already available. If not, the user is redirected to Spotify's authorization URL to log in and grant permissions. Once authorized, Spotify provides the app with an access token via the redirect URL.

The module then extracts the token from the URL and stores it in memory, making it available for subsequent API requests. This token is also given an expiration time, after which the user must request a new token. This logic ensures that the app can efficiently manage authentication and maintain secure access to Spotify's API throughout the user session.

#### 10. Implementing Spotify Search Requests

In PlayListify, the search bar was connected to the Spotify API, allowing users to query Spotify’s music library and receive results based on their input.

This functionality was implemented by using the `/v1/search?type=track` endpoint from the Spotify API. When a user enters a search term in the search bar and submits it, the app sends a request to the Spotify API, including the search parameter in the query. The access token, previously obtained and stored in the JavaScript module, is attached to the request header for authorization.

Upon receiving a response from the API, the relevant data—such as track name, artist, album, and URIs extracted and passed to the components responsible for displaying the search results. The results are then rendered for the user in real-time, allowing them to browse tracks based on their search query.

Refer to the [Spotify Web API Endpoint Reference](https://developer.spotify.com/documentation/web-api/reference#/) for guidance on formatting API requests.

#### 11. Saving a User's Playlist

In PlayListify, a method was implemented to allow users to save their custom playlists directly to their Spotify account when they click the "Save To Spotify" button.

To achieve this, the method first sends a request to Spotify’s API to create a new playlist in the user’s account. This request includes the playlist’s custom name, which is passed from the user input. Once the new playlist is successfully created, the method retrieves the playlist ID provided in the response.

Next, the app sends another request to add tracks to the newly created playlist. The URI values of each track in the user's custom playlist are collected into an array, which is then sent in the request to the Spotify API. This request appends the tracks to the playlist using the playlist ID obtained earlier.

Both requests (creating the playlist and adding the tracks) are authenticated using the user's access token, which ensures that the API interactions are secure and authorized.

Once the playlist is saved, the app resets the current playlist, giving users a fresh start to create another playlist if they wish. This feature integrates smoothly with Spotify, enabling users to manage their playlists directly from PlayListify and saving them to their Spotify account in just a few clicks.

## Future Work ##

The following potential features are being considered and worked on to enhance the functionality and user experience of the PlayListify app. These improvements aim to streamline playlist creation, improve usability, and provide a more seamless interaction with the Spotify API. They include features that enhance track selection, optimize API handling, and improve overall app responsiveness and feedback.

* Track Preview Samples: Implementing track preview functionality would allow users to listen to short snippets of each song directly from the search results. This feature enhances the user experience by letting users quickly evaluate tracks before adding them to their playlists.

* Loading Screen During Playlist Save: A loading screen or progress indicator could be introduced when a playlist is being saved. This would provide users with clear feedback that their playlist is being processed, preventing confusion and improving the overall user experience.

* Precise Access Token Expiration: The app's access token logic could be refined to expire exactly when Spotify's token expires, rather than setting expiration based on when a new search is initiated. This would ensure smoother API interactions and reduce the likelihood of failed requests due to token expiration issues.

* Restore Search Term After Login Redirect: After users log in to Spotify and are redirected back to the app, restoring the previous search term would ensure continuity. This would allow users to pick up where they left off without needing to re-enter their search queries.

## Thank you, Have a nice day! ##








