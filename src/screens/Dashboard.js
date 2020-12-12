import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DATA from '../assets/data.json';
import {getData, setData} from '../utils/asyncStorage';
const Dashboard = ({navigation}) => {
  const [lists, setLists] = React.useState([]);
  const [count, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10, padding: 3}}
          onPress={() => navigation.navigate('Checkout')}>
          <Text>Корзина</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const _handleAddToBusket = async (item) => {
    try {
      const data = (await getData('@data')) || [];
      data.push(item);
      setData('@data', data);
    } catch (e) {
      console.warn(e);
    }
  };

  React.useEffect(() => {
    setLists(DATA);
  }, []);

  return (
    <FlatList
      data={lists}
      keyExtractor={(item, index) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details', {item, _handleAddToBusket})
          }>
          <View style={styles.container}>
            <Image style={styles.image} source={{uri: item.image}} />
            <View style={styles.info}>
              <Text style={styles.info_title}>{item.title}</Text>
              <Text style={styles.info_cost}>{item.cost} $/шт</Text>
              <Text style={styles.info_all}>Всего: {item.all}</Text>
              <TouchableOpacity
                onPress={() => _handleAddToBusket(item)}
                style={styles.info_add_button}>
                <Text>Добавить в корзину</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {width: 120, height: 100},
  info: {paddingLeft: 10},
  info_title: {
    width: Dimensions.get('screen').width / 1.5,
    fontWeight: 'bold',
    fontSize: 18,
    flexShrink: 1,
  },
  info_cost: {fontSize: 16},
  info_all: {},
  info_add_button: {
    width: Dimensions.get('screen').width / 2.5,
    padding: 10,
    backgroundColor: '#2196F3',
  },
});

export default Dashboard;
