import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Details = ({route}) => {
  const {item} = route.params;
  const {_handleAddToBusket} = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: item.image}} />
      <View style={styles.info}>
        <Text style={styles.info_title}>{item.title}</Text>
        <Text style={styles.info_cost}>{item.cost} $/шт</Text>
        <Text style={styles.info_all}>Всего: {item.all}</Text>
        <TouchableOpacity
          style={styles.info_add_button}
          onPress={() => _handleAddToBusket(item)}>
          <Text>Добавить в корзину</Text>
        </TouchableOpacity>
        <Text style={styles.info_note}>Всего: {item.note}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    // justifyContent: 'space-between',
  },
  image: {
    width: Dimensions.get('screen').width / 1.1,
    height: Dimensions.get('screen').height / 3,
  },
  info: {},
  info_title: {
    width: Dimensions.get('screen').width / 1.1,
    fontWeight: 'bold',
    fontSize: 24,
    flexShrink: 1,
  },
  info_cost: {fontSize: 20},
  info_all: {fontSize: 18},
  info_note: {fontSize: 18},
  info_add_button: {
    width: Dimensions.get('screen').width / 2.5,
    padding: 10,
    backgroundColor: '#2196F3',
  },
});
export default Details;
