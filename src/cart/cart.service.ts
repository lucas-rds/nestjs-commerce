import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/Product.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addProducts(cartId: number, productIds: number[]): Promise<Cart> {
    const cart = await this.findOne(cartId);
    cart.products.push(...productIds.map(id => ({ id } as Product)));
    await this.cartRepository.save(cart);
    return this.findOne(cartId);
  }

  async removeProducts(cartId: number, productIds: number[]): Promise<Cart> {
    const cart = await this.findOne(cartId);
    cart.products = cart.products.filter(
      product => !productIds.includes(product.id),
    );
    await this.cartRepository.save(cart);
    return this.findOne(cartId);
  }

  async create(createCartDto: CreateCartDto) {
    const products = createCartDto.products.map(id => ({ id } as Product));
    const cart = await this.cartRepository.save({ products });
    return this.findOne(cart.id);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number): Promise<Cart> {
    return this.cartRepository.findOne(id, { relations: ['products'] });
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.findOne(id);
    cart.products = updateCartDto.products.map(id => ({ id } as Product));
    return this.cartRepository.save(cart);
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
