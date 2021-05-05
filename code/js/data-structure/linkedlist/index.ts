interface NodeType{
    next?: NodeType | null,
    val?: number
} 

class LinkedList implements NodeType {
    next = undefined;
    element = undefined;
    push(elemnt: NodeType){

    }
}
