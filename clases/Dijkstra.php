<?PHP
define('I',100000); // define infinite distance

/**
 * class to Build Dijkstra model
 * To build the class 
 * Use int to index all the points on the map
 * @param int startPoint
 * @param array routes[] = array($startPoint,$endPoint,$distance)
 * @author Rick.purple
 * @author Ivan Rodriguez
 */

class Dijkstra{
    private $intStartPoint; 
    private $aRoutes = array(); // all possible routes between each two points (two-way direction) 
    private $aPoints = array(); // all the points on the map
    private $aReds = array();   
    private $aBlues = array(); 
    private $aDistances = array(); // the closest distance from start point to each points
    private $aPathes = array(); // path from each points to its neibor on the best path to the start point
    private $aFullPathes; // path from start point to each points
    
    /**
     * Build Dijkstra model, find best path and closest distance from start point to each point on the map 
     * @return null
     * @param object $intStartPoint 
     * @param object $aRoutes
     */
    public function __construct($intStartPoint,$aRoutes){
        $this->intStartPoint = $intStartPoint;
        
        foreach($aRoutes as $aRoute){
            // makes the direction between nodes a two-way relation
            array_push($aRoutes, array($aRoute[1], $aRoute[0], $aRoute[2]));
            if(!in_array($aRoute[0],$this->aPoints)){
                $this->aPoints[] = $aRoute[0];
            }
            if(!in_array($aRoute[1],$this->aPoints)){
                $this->aPoints[] = $aRoute[1];
            }    
        }    
        
        $this->aRoutes = $aRoutes;
        
        $this->aReds = array($intStartPoint);
        $this->aBlues = $this->array_remove($this->aPoints, $intStartPoint);    
        
        foreach($this->aBlues as $intPoint){
                $this->aDistances[$intPoint] = I;
        }
        $this->aDistances[$intStartPoint] = 0;    
        
        $this->findPath();
        
        $this->getPath();
    }

    /**
     * function to get the best path
     * @return pathes for each node on the map
     */    
    public function getPath(){
        foreach($this->aPoints as $intPoint){
            $this->fillFullPath($intPoint,$intPoint);
        }
        return $this->aFullPathes;
    }
    
    /**
     * function to get the closest distance     
     * @return 
     */
    public function getDistance(){
        return $this->aDistances;
    }    

    /**
     * Remove specified element from array
     * @return array 
     * @param array $arr : array to be processing
     * @param array $value : the element to be remove from the array
     */    
    private function array_remove($arr,$value) {
        return array_values(array_diff($arr,array($value)));
    }
    
    /**
     * Dijkstra algorithm implementation
     * @return null
     */
    private function findPath(){
        while(!empty($this->aBlues)){
            $intShortest = I;
            foreach($this->aReds as $intRed){
                # find possible route
                foreach($this->aRoutes as $aRoute){
                    if($intRed == $aRoute[0]){
                        $aDis[$intRed][$aRoute[1]] = $aRoute[2];
                        
                        # rewrite distance
                        $intDistance = $this->aDistances[$intRed] + $aRoute[2];
                        if($this->aDistances[$aRoute[1]] > $intDistance){
                            $this->aDistances[$aRoute[1]] = $intDistance;
                            # change the path
                            if($intRed==$this->intStartPoint ||$intRed==$aRoute[1]){}
                            else{
                                $this->aPathes[$aRoute[1]] = $intRed;
                            }
                        }
                        
                        # find the nearest neighbor
                        if(!in_array($aRoute[1],$this->aReds)&&$aRoute[2]<$intShortest){
                            $intShortest = $aRoute[2];
                            $intAddPoint = $aRoute[1];
                        }        
                    }
                }
            }

            $this->aReds[] = $intAddPoint;
            $this->aBlues = $this->array_remove($this->aBlues, $intAddPoint);    
        }
    }

    /**
     * mid step function to find full path from start point to the end point.
     * @return null
     * @param int $intEndPoint
     * @param int $intMidPoint
     */        
    private function fillFullPath($intEndPoint,$intMidPoint){
        if(isset($this->aPathes[$intMidPoint])){
            $this->aFullPathes[$intEndPoint][] = $this->aPathes[$intMidPoint];
            $this->fillFullPath($intEndPoint,$this->aPathes[$intMidPoint]);
        }
        else{
            $this->aFullPathes[$intEndPoint][] = $this->intStartPoint;
        }                    
    }

    /**
    Functions added to the original class. Used to get information about paths
    for a single destination node
    **/
    
    public function getCompletePathToNode($nodeIndex){
        $path = $this->aFullPathes[$nodeIndex];
        array_unshift($path, $nodeIndex);
        return array_reverse($path);
    }
    
    public function getDistancesToNode($completePath){
        $distances = array();
        for($i=0; $i<count($completePath)-1; $i++)
            array_push($distances, $this->getDistanceBetweenNodes($completePath[$i], $completePath[$i+1]));
        return $distances;
    }
    
    public function getDistanceToNode($nodeIndex){
        return $this->aDistances[$nodeIndex];
    }
    
    private function getDistanceBetweenNodes($startNodeIndex, $endNodeIndex) {
        foreach($this->aRoutes as $route)
            if($route[0] == $startNodeIndex && $route[1] == $endNodeIndex)
                return $route[2];
    }
} 
?>