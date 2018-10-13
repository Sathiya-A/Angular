import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.jarvis.net{
   export enum ShippingMethods {
      courierServices,
      airFreight,
      seaFreight,
   }
   export enum ShippingTerms {
      EXW,
      FOB,
      CFR,
      CIF,
      DAT,
      DAP,
      DDP,
   }
   export class Address {
      addressId: string;
      PersonInChargeFullName: string;
      title: string;
      address1: string;
      address2: string;
      city: string;
      country: string;
      zipcode: string;
      phone: string;
      email: string;
      isActive: boolean;
   }
   export class Product {
      productId: string;
      shortName: string;
      description: string;
      unitPrice: number;
   }
   export class ProductDetails extends Product {
      unitsInStock: number;
      unitsProducedPerDay: number;
   }
   export class SelectedProduct extends Product {
      quantity: number;
   }
   export class Notes {
      NoteId: string;
      NoteText: string;
   }
   export abstract class Company extends Participant {
      companyId: string;
      companyName: string;
      defaultAddress: Address;
   }
   export class OEM extends Company {
      plants: Address[];
   }
   export class Supplier extends Company {
      products: ProductDetails[];
   }
   export class PurchaseOrder extends Asset {
      POId: string;
      poDate: Date;
      vendor: Supplier;
      shippingMethod: ShippingMethods;
      referencePOId: string;
      shipDate: Date;
      expectedDeliveryDate: Date;
      shipmentTerm: ShippingTerms;
      shipTo: Address;
      items: SelectedProduct[];
      subTotal: number;
      processingFees: number;
      taxRate: number;
      tax: number;
      total: number;
      note: Notes[];
      is_accepted: boolean;
      rejectReason: string;
   }
   export class Accept extends Transaction {
      PO: PurchaseOrder;
      approvingParty: Supplier;
   }
   export class AcceptEvent extends Event {
      PO: PurchaseOrder;
      approvingParty: Supplier;
   }
   export class Reject extends Transaction {
      PO: PurchaseOrder;
      rejectingParty: Supplier;
      rejectReason: string;
   }
   export class RejectEvent extends Event {
      PO: PurchaseOrder;
      rejectingParty: Supplier;
      rejectReason: string;
   }
// }
