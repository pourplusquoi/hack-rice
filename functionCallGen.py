import os
import geography as geo

def generate(locations, intensities):
    functionCall = 'eqfeed_callback(['
    cluster = zip(locations, intensities)
    
    for elem in cluster:
        functionCall += '[' + str(elem[0].latitude) + ',' \
            + str(elem[0].longitude) + ',' + str(elem[1]) + '],'
    functionCall = functionCall[0:len(functionCall) - 1]
    functionCall += ']);'
    
    file = open("./functionCall.js", "wb")
    file.write(functionCall)
    file.close()

def test():
    locations = [geo.getLocation('6100 Main St Houston TX'), geo.getLocation('2410 Shakespeare St Houston TX')]
    intensities = [1, 2]
    generate(locations, intensities)

if __name__ == '__main__':
    test()