import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {getData, removeData} from '../utils/asyncStorage';

const Checkout = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = async () => {
    const localData = await getData('@data');
    const res =
      localData &&
      localData.filter(
        (thing, index, self) =>
          index ===
          self.findIndex((t) => t.id === thing.id && t.title === thing.title),
      );

    const sum =
      res && res.map((item) => item.cost).reduce((prev, next) => prev + next);
    setData(res);
    setTotal(sum);
  };

  const _handleOrder = () => {
    setData([]);
    setTotal(0);
    removeData('@data');
    navigation.goBack();
  };

  return data ? (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Image style={styles.image} source={{uri: item.image}} />
            <View style={styles.info}>
              <Text style={styles.info_title}>{item.title}</Text>
              <Text style={styles.info_all}>Всего: {item.all}</Text>
            </View>
            <Text style={styles.info_cost}>{item.cost} $/шт</Text>
          </View>
        )}
      />
      <TouchableOpacity onPress={_handleOrder} style={styles.order}>
        <Text>{`Купить за ${total} $`}</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.empty}>
      <Text style={styles.empty_title}>Корзина пуста!</Text>
      <Text >Купи что нибудь !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    // justifyContent: 'space-between',
  },
  image: {width: 70, height: 60},
  info: {paddingLeft: 10},
  info_title: {
    width: Dimensions.get('screen').width / 2,
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
  info_cost: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  order: {
    alignItems: 'center',
    padding: 20,
    margin: 10,
    backgroundColor: '#2196F3',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Checkout;
