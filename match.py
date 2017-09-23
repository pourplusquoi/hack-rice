import geography as geo

class Receiver:
    def __init__(self, userId, requests, location):
        self.id = userId
        self.requests = requests
        self.location = location

class Warehouse:
    def __init__(self, warehouseId, storage, location):
        self.id = warehouseId
        self.storage = storage
        self.location = location

class Order:
    def __init__(self, userId, warehouseId, item, quantity):
        self.userId = userId
        self.warehouseId = warehouseId
        self.item = item
        self.quantity = quantity

def mach(reveivers, warehouses):
    matches = []
    for recv in reveivers:
        for item in recv.requests:
            # quant = sum(map(lambda house: house.storage[item], warehouses))
            # if quant < recv.requests[item]:
            #     continue
            warehouses.sort(key = lambda house: geo.distance(house.location, recv.location))
            for house in warehouses:
                if recv.requests[item] <= house.storage[item]:
                    matches.append(Order(recv.id, house.id, item, recv.requests[item]))
                    house.storage[item] -= recv.requests[item]
                    break
                else:
                    matches.append(Order(recv.id, house.id, item, house.storage[item]))
                    recv.requests[item] -= house.storage[item]
    return matches

def test():
    loc_1 = geo.getLocation('6100 Main St Houston TX')
    loc_2 = geo.getLocation('2410 Shakespeare St Houston TX')
    print 'Get location succeed'

    house_1 = Warehouse(1, {'food': 4, 'bed': 2}, loc_1)
    house_2 = Warehouse(2, {'food': 1, 'bed': 1}, loc_2)

    receiver_1 = Receiver(1, {'food': 3, 'bed': 2}, loc_2)
    receiver_2 = Receiver(2, {'food': 1, 'bed': 1}, loc_1)

    matches = mach([receiver_1, receiver_2], [house_1, house_2])
    for match in matches:
        print match.userId, match.warehouseId, match.item, match.quantity

if __name__ == '__main__':
    test()
