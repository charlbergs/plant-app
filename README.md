# plant-app
A React Native app to keep track of watering your house plants.

The application allows users to manage house plants by storing their name, species and picture, as well as governing watering and fertilizing intervals. The app also offers species-specific information on watering and sunlight, to further strengthen one's gardening skills and knowledge on plants. 

The app is developed using [Expo](https://docs.expo.dev/), and it uses components from both [React](https://react.dev/reference/react) and [React Native](https://reactnative.dev/) libraries. 

For database operations the app utilizes [SQLite](https://www.sqlite.org/index.html) and its [Expo implementation](https://docs.expo.dev/versions/latest/sdk/sqlite/). From Expo SDK, additional libraries used in this project are [ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/), [MediaLibrary](https://docs.expo.dev/versions/latest/sdk/media-library/) and [FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/). Navigation is handled by [React-Navigation](https://reactnavigation.org/). 

The app's appearance is mainly made with [React Native Paper](https://reactnativepaper.com/), with some components from [React Native Elements](https://reactnativeelements.com/).

This application utilizes [Perenual API](https://perenual.com/docs/api) for obtaining the plant care information. During development, the free personal plan has been used. Note that the care instructions search does not work without the `API_URL` and `API_KEY` (specified in an [.env](https://www.npmjs.com/package/dotenv) file), which are omitted from the GitHub version of the app. 

The icons used for the two placeholder pictures are from [Akar Icons Pack by Icon Duck](https://www.figma.com/community/plugin/1183567784877746075). 

The app has been developed as a part of Haaga-Helia's Mobile Programming course.
