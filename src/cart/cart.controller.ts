import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddRemoveProductCartDto } from './dto/add-remove-product-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Post('/:id/products')
  addProducts(
    @Param('id') cartId: number,
    @Body() addRemoveProductCartDto: AddRemoveProductCartDto,
  ) {
    return this.cartService.addProducts(
      cartId,
      addRemoveProductCartDto.products,
    );
  }

  @Delete('/:id/products')
  removeProducts(
    @Param('id') cartId: number,
    @Body() addRemoveProductCartDto: AddRemoveProductCartDto,
  ) {
    return this.cartService.removeProducts(
      cartId,
      addRemoveProductCartDto.products,
    );
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
