import geography as geo

class Receiver:
    def __init__(self, userId, requests, location):
        self.id = userId
        # requests :: {'item': quantity}
        self.requests = requests
        self.location = location

class Warehouse:
    def __init__(self, warehouseId, storage, location):
        self.id = warehouseId
        # storage :: {'item': quantity}
        self.storage = storage
        self.location = location

class Warehouse_s:
    def __init__(self, warehouseId, itemTuples, location):
        self.id = warehouseId
        # itemTuple :: [donator, item, quantity]
        self.itemTuples = itemTuples
        self.location = location

class Order:
    def __init__(self, userId, warehouseId, item, quantity):
        self.userId = userId
        self.warehouseId = warehouseId
        self.item = item
        self.quantity = quantity

class Order_s:
    def __init__(self, donatorId, receiverId, warehouseId, item, quantity):
        self.donatorId = donatorId
        self.receiverId = receiverId
        self.warehouseId = warehouseId
        self.item = item
        self.quantity = quantity

def mach(receivers, warehouses):
    matches = []
    for recv in receivers:
        for item in recv.requests:
            warehouses.sort(key = lambda house: geo.distance(house.location, recv.location))
            for house in warehouses:
                if recv.requests[item] <= house.storage[item]:
                    matches.append(Order(recv.id, house.id, item, recv.requests[item]))
                    recv.requests[item] = 0
                    house.storage[item] -= recv.requests[item]
                    break
                else:
                    matches.append(Order(recv.id, house.id, item, house.storage[item]))
                    recv.requests[item] -= house.storage[item]
                    house.storage[item] = 0
    return matches

def match_s(receivers, warehouses, maximum=10):
    def reduce(__houseId, __donator, __item, __quantity):
        for i in range(len(warehouses)):
            if warehouses[i].id == __houseId:
                for j in range(len(warehouses[i].itemTuples)):
                    ref = warehouses[i].itemTuples[j]
                    if ref[0] == __donator and ref[1] == __item and ref[2] >= __quantity:
                        warehouses[i].itemTuples[j][2] -= __quantity
                        return
    matches = []
    for recv in receivers:
        for item in recv.requests:
            warehouses.sort(key = lambda house: geo.distance(house.location, recv.location))
            for house in warehouses:
                if geo.distance(house.location, recv.location) > maximum: break
                matchedTuples = filter(lambda itemTuple: itemTuple[1] == item, house.itemTuples)
                for _tuple in matchedTuples:
                    if _tuple[2] == 0: continue
                    elif recv.requests[item] >= _tuple[2]:
                        matches.append(Order_s(_tuple[0], recv.id, house.id, item, _tuple[2]))
                        reduce(house.id, _tuple[0], _tuple[1], _tuple[2])
                        recv.requests[item] -= _tuple[2]
                    elif recv.requests[item] > 0:
                        matches.append(Order_s(_tuple[0], recv.id, house.id, item, recv.requests[item]))
                        reduce(house.id, _tuple[0], _tuple[1], recv.requests[item])
                        recv.requests[item] = 0
                        break
                    else: break
    return matches

def test():
    loc_1 = geo.getLocation('6100 Main St Houston TX')
    loc_2 = geo.getLocation('2410 Shakespeare St Houston TX')
    print 'Get location succeed'

    house_1 = Warehouse_s(1, [[17, 'food', 4], [22, 'bed', 5], [17, 'bed', 3]], loc_1)
    house_2 = Warehouse_s(2, [[15, 'food', 1], [22, 'bed', 1]], loc_2)

    receiver_1 = Receiver(1, {'food': 3, 'bed': 2}, loc_2)
    receiver_2 = Receiver(2, {'food': 5, 'bed': 8}, loc_1)

    matches = match_s([receiver_1, receiver_2], [house_1, house_2])
    for match in matches:
        print match.donatorId, match.receiverId, match.warehouseId, match.item, match.quantity

if __name__ == '__main__':
    test()
