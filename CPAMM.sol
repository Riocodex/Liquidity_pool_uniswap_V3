//SPDX-License-Identifier: MIT
pragma solidty ^0.8.13;
import "./IERC20.sol";

contract CPMM {
    IERC20 public immutable token0;
    IERC20 public immutable token1;

    uint public reserve0;
    uint public reserve1;

    uint public totalSupply;
    mapping(address=>uint) public balanceOf;

    constructor(address _token0, address _token1){
        token0 = IERC20(_token0);
        token1 = IERC20(_token1);
    }

    function _mint(address _to, uint _amount)private{
        balanceOf[_to] += _amount;
        totalSupply += _amount;
    }

    function _burn(address _from, uint _amount) private {
        balanceOf[_from] -= _amount;
        totalSupply -= _amount;
    }

    function swap(address _tokenIn, uint _amountIn)
     external returns(uint amountOut)
     {
         require(
             _tokenIn == address(token0) || _tokenIn == address(token1),
             "Invalide token"
         );
         require(_amountIn > 0, "amount in = 0 ");

         //pull in token in
         bool isToken0 = _tokenIn == address(token0);
         (IERC20 tokenIn, IERC20 tokenOut, uint reserveIn, uint reserveOut) = isToken0
            ? (token0, token1, reserve0, reserve1)
            : (token1, token0, reserve1, reserve0);

         tokenIn.transferFrom(msg.sender, address(this), _amountIn);
         //calculate token out(include fees), 0.3%
         
         //amount of tokens that go out(dy)
         //the amount of tokenout that isnt in the contract(y)
         //the amount of tokens in that came in(dx)
         //that amount of tokens that are not in this contract before the swap(x)
        //ydx / (x + dx) = dy
        uint amountInWithFee = (_amountIn * 997) / 1000;
        amountOut = ()

        //transfer token out to  msg.sender
         tokenOut.transfer(msg.sender, amountOut);
         //update the reserves

     }

    function addLiquidity() external {}

}