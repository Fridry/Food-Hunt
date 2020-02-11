import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);

  const id = navigation.getParam('id');

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, [id]);

  if (!result) {
    return null;
  }

  if (!result.photos) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result.name}</Text>

      <Text>
        {result.location.address1} - {result.location.city}
      </Text>

      <Text>Phone: {result.phone}</Text>

      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image source={{ uri: item }} style={styles.image} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 10,
  },
  image: {
    height: 200,
    width: 300,
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ResultsShowScreen;
