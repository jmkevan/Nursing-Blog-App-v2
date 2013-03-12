/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"q4WaD6lom1lylQBYgzeXk1ouvHHne8Mu"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"88j5CyQZTkL3oLEx5Xh1VPWI42hWCfsz"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"gPWkwhW9SW0QUNFWAIlYyFghIMO3Qf4k"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"qO8F4cDNBiR0qXn4s055wIWQVc2Aq2Qw"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"5fmO6LHCTh37zNQfQ5vhHIrUht0bYEB3"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"bwtbJU2tZJtIBOeoEPvp5uXttfLf6S8M"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
