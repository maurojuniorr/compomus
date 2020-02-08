//
//  BeaconDetector.m
//  AwesomeProject
//
//  Created by mauro amazonas on 04/01/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"
#import <React/RCTLog.h>
#import <Foundation/Foundation.h>



@interface RCT_EXTERN_MODULE(MyNativeModule, RCTEventEmitter)
//Função serve pra configurar qual beacon procurar e define a distancia
RCT_EXTERN_METHOD(setBeacon:(NSString *) uuid ident:(NSString *) ident ma:(nonnull NSNumber *)ma mi:(nonnull NSNumber *)mi beaconRange:(nonnull NSNumber *)beaconRange)

//Função recebe os dados de ativo, inativo ou background da tela
RCT_EXTERN_METHOD(screenStatus:(NSString *)screen)

//Função recebe os dados de usuário e som atuais
RCT_EXTERN_METHOD(userInfo:(nonnull NSNumber *) userID sound:( NSString *) sound)
@end

//RCT_EXTERN_METHOD(sendOnOSC:(nonnull NSNumber *) userID sound:(nonnull NSNumber *) sound)

////RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)
//+(BOOL)requiresMainQueueSetup
//{
//  return NO;  // only do this if your module initialization relies on calling UIKit!
//}

